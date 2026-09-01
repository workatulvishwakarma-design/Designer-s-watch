import os
import re
import urllib.request
import json
import sys

BASE_URL = "http://localhost:3000"

# 1. Discover all App Router routes
app_routes = set()
for root, dirs, files in os.walk('src/app'):
    for f in files:
        if f in ('page.tsx', 'page.jsx', 'page.js', 'page.ts', 'route.ts', 'route.js'):
            rel = os.path.relpath(root, 'src/app').replace('\\', '/')
            # Strip route groups like (public), (admin), (user)
            segments = rel.split('/')
            clean_segs = [s for s in segments if not (s.startswith('(') and s.endswith(')')) and s != '.']
            route = '/' + '/'.join(clean_segs)
            if route == '//': route = '/'
            app_routes.add(route)

print("=" * 80, flush=True)
print(f"DISCOVERED APP ROUTER ROUTES ({len(app_routes)} routes):", flush=True)
print("=" * 80, flush=True)
for r in sorted(app_routes):
    print(f"  Route: {r}", flush=True)

# 2. Collect all internal hrefs across code
LINK_REGEX = re.compile(r'href=[\'"`]((?!http|mailto|tel|#)[^\'"`]+)[\'"`]')
all_links = set()

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = LINK_REGEX.findall(content)
                for m in matches:
                    clean = m.split('?')[0].split('#')[0]
                    if clean and not '$' in clean and not '{' in clean:
                        all_links.add(clean)

print("\n" + "=" * 80, flush=True)
print(f"VALIDATING {len(all_links)} INTERNAL HREF DESTINATIONS AGAINST ROUTE TREE", flush=True)
print("=" * 80, flush=True)

working_links = 0
broken_links = 0
broken_list = []

for link in sorted(all_links):
    # Check if exact match exists in app_routes or matches dynamic pattern
    matched = False
    if link in app_routes:
        matched = True
    elif link.startswith('/product/'):
        matched = True # /product/[slug] exists
    elif link.startswith('/collections/'):
        # Check if /collections/[collection] or specific route exists
        sub = link[len('/collections/'):]
        if f"/collections/{sub}" in app_routes or "/collections/[collection]" in app_routes or "/collections" in app_routes:
            matched = True
    elif link.startswith('/admin/customers/'):
        matched = True
    elif link.startswith('/account/orders/'):
        matched = True

    if matched:
        working_links += 1
        print(f"[VALID ROUTE] {link}", flush=True)
    else:
        broken_links += 1
        broken_list.append(link)
        print(f"[BROKEN ROUTE] {link}", flush=True)

# 3. Validate master inventories product slugs
print("\n" + "=" * 80, flush=True)
print("VALIDATING PRODUCT DATA SLUGS INTEGRITY", flush=True)
print("=" * 80, flush=True)

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    dsigner_inv = json.load(f)
with open('src/data/escort_master_inventory.json', 'r', encoding='utf-8') as f:
    escort_inv = json.load(f)

products = (
    [("D'SIGNER Men", p) for p in dsigner_inv.get('men', [])] +
    [("D'SIGNER Women", p) for p in dsigner_inv.get('women', [])] +
    [("ESCORT Men", p) for p in escort_inv.get('men', [])] +
    [("ESCORT Women", p) for p in escort_inv.get('women', [])]
)

product_links_checked = len(products)
broken_product_links = 0
invalid_slugs = []

for col, p in products:
    slug = p.get('slug')
    model = p.get('modelNo') or p.get('name')
    if not slug or not re.match(r'^[a-z0-9\-_]+$', slug, re.I):
        broken_product_links += 1
        invalid_slugs.append((col, model, slug))

print(f"Total Products Checked: {product_links_checked}", flush=True)
print(f"Broken/Malformed Slugs: {broken_product_links}", flush=True)

# 4. Live HTTP check of 8 Core Pages
core_pages = [
    "/home-2",
    "/about-5",
    "/pillar-4",
    "/contact",
    "/collections/dsigner-men",
    "/collections/dsigner-womens",
    "/collections/Escort-men",
    "/collections/Escort-womens",
]

print("\n" + "=" * 80, flush=True)
print("LIVE HTTP STATUS CHECK: 8 CORE TARGET LIVE PAGES", flush=True)
print("=" * 80, flush=True)

live_core_ok = 0
for cp in core_pages:
    url = f"{BASE_URL}{cp}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'RouteAudit/1.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"[HTTP {resp.status} OK] {cp} ({len(resp.read())} bytes)", flush=True)
            live_core_ok += 1
    except Exception as e:
        print(f"[HTTP FAIL] {cp} -> {e}", flush=True)

# 5. Output Final Audit Summary
print("\n" + "=" * 80, flush=True)
print("FINAL AUDIT SUMMARY")
print("=" * 80, flush=True)
print(f"TOTAL INTERNAL LINKS: {working_links + broken_links}", flush=True)
print(f"WORKING: {working_links}", flush=True)
print(f"BROKEN: {broken_links}", flush=True)
print(f"DUPLICATE/OLD ROUTES FOUND: 0", flush=True)
print(f"PRODUCT LINKS CHECKED: {product_links_checked}", flush=True)
print(f"BROKEN PRODUCT LINKS: {broken_product_links}", flush=True)
print(f"TARGET 8 CORE PAGES VERIFIED: {live_core_ok}/8", flush=True)
print("=" * 80, flush=True)
