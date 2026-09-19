import os
import json
import re
from PIL import Image

# Load all inventories and maps
with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    master_inv = json.load(f)
all_items = master_inv.get('men', []) + master_inv.get('women', [])

with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    trans_map = json.load(f)

with open('src/data/collectionMap.ts', 'r', encoding='utf-8') as f:
    cmap_text = f.read()

with open('src/data/collections.ts', 'r', encoding='utf-8') as f:
    col_text = f.read()

# Get all files in public/
all_public = {}
for root, dirs, files in os.walk('public'):
    for f in files:
        rel = os.path.relpath(os.path.join(root, f), 'public').replace('\\', '/')
        all_public['/' + rel] = os.path.join(root, f)

targets_list = [
    (1, "Pulse 869RTM.16G", "869RTM.16G", "Pulse"),
    (2, "Breeze 794RTM.9L", "794RTM.9L", "Breeze"),
    (3, "Breeze 794SM.2L", "794SM.2L", "Breeze"),
    (4, "Breeze 794SMSL", "794SMSL", "Breeze"),
    (5, "Breeze 794", "794", "Breeze"),
    (6, "Breeze 788", "788", "Breeze"),
    (7, "Vortex 851", "851", "Vortex"),
    (8, "Pulse 823BRNL.9G", "823BRNL.9G", "Pulse"),
    (9, "Tidemark 876RTM.9G", "876RTM.9G", "Tidemark"),
    (10, "Tactix 200SM.5G", "200SM.5G", "Tactix"),
    (11, "Tactix 865", "865", "Tactix"),
    (12, "Tactix 200", "200", "Tactix"),
    (13, "Glimmer 860TM.12L", "860TM.12L", "Glimmer"),
    (14, "Glimmer 860TM.16L", "860TM.16L", "Glimmer"),
    (15, "Tactix 200RTM.2G", "200RTM.2G", "Tactix"),
    (16, "Tactix 200RTM.3G", "200RTM.3G", "Tactix"),
    (17, "Tactix 200GM.16G", "200GM.16G", "Tactix"),
    (18, "Tactix 875RGGNM.3G", "875RGGNM.3G", "Tactix"),
    (19, "Tactix 804", "804", "Tactix"),
    (20, "Tactix 875RGBLM.5G", "875RGBLM.5G", "Tactix"),
    (21, "Tactix 200SM.2G", "200SM.2G", "Tactix"),
    (22, "Tactix 200SM.3G", "200SM.3G", "Tactix"),
    (23, "Hallmark 862", "862", "Hallmark"),
    (24, "Hallmark 912RGM.6L", "912RGM.6L", "Hallmark"),
    (25, "Hallmark 912RTM.5L", "912RTM.5L", "Hallmark"),
    (26, "Hallmark 777", "777", "Hallmark"),
    (27, "Grandeur 980GFS.16", "980GFS.16", "Grandeur"),
    (28, "Hallmark 912TM.6L", "912TM.6L", "Hallmark"),
    (29, "Quest 802", "802", "Quest"),
    (30, "Duetto 521", "521", "Duetto"),
    (31, "Daymark 867", "867", "Daymark"),
    (32, "Daymark 809", "809", "Daymark"),
    (33, "Daymark 829", "829", "Daymark"),
    (34, "Daymark 821", "821", "Daymark"),
    (35, "Bondline 820", "820", "Bondline"),
]

def check_img_alpha(rel_path):
    if not rel_path or rel_path not in all_public:
        return False, "File missing"
    try:
        im = Image.open(all_public[rel_path])
        if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
            im_rgba = im.convert('RGBA')
            alpha = im_rgba.split()[3]
            ext = alpha.getextrema()
            hist = alpha.histogram()
            trans_pct = sum(hist[:50]) / (im.size[0] * im.size[1]) * 100
            if ext[0] < 50 and trans_pct > 5:
                return True, f"Transparent ({trans_pct:.1f}% trans, min alpha {ext[0]})"
            else:
                return False, f"RGBA but opaque ({trans_pct:.1f}% trans)"
        else:
            im_rgb = im.convert('RGB')
            w, h = im.size
            corners = [im_rgb.getpixel((0,0)), im_rgb.getpixel((w-1,0)), im_rgb.getpixel((0,h-1)), im_rgb.getpixel((w-1,h-1))]
            return False, f"Opaque {im.mode} {im.size}, corners: {corners[0]}"
    except Exception as e:
        return False, f"Error: {e}"

results = []

for num, target_name, model, coll in targets_list:
    # 1. Match in inventory
    inv_item = next((it for it in all_items if it.get('modelNo', '').lower() == model.lower()), None)
    
    # If not exact match, check if it's a series model or has partial match
    inv_series = []
    if not inv_item:
        inv_series = [it for it in all_items if it.get('series', '') == model or it.get('collection', '').lower() == coll.lower() and model.lower() in it.get('name', '').lower()]
        
    # Check in collectionMap.ts
    cmap_img = None
    # match model in collectionMap
    cmap_patterns = [
        r"name:\s*['\"]" + re.escape(model) + r"['\"].*?image:\s*['\"]([^'\"]+)['\"]",
        r"name:\s*['\"][^'\"]*" + re.escape(model) + r"[^'\"]*['\"].*?image:\s*['\"]([^'\"]+)['\"]",
        r"model:\s*['\"]" + re.escape(model) + r"['\"].*?image:\s*['\"]([^'\"]+)['\"]",
    ]
    for cp in cmap_patterns:
        m = re.search(cp, cmap_text, re.DOTALL)
        if m:
            cmap_img = m.group(1)
            break
            
    # Check in collections.ts
    col_img = None
    col_patterns = [
        r"name:\s*['\"]" + re.escape(model) + r"['\"].*?image:\s*['\"]([^'\"]+)['\"]",
        r"name:\s*['\"][^'\"]*" + re.escape(model) + r"[^'\"]*['\"].*?image:\s*['\"]([^'\"]+)['\"]",
        r"['\"]" + re.escape(model) + r"['\"].*?image:\s*['\"]([^'\"]+)['\"]",
    ]
    for cp in col_patterns:
        m = re.search(cp, col_text, re.DOTALL)
        if m:
            col_img = m.group(1)
            break

    # Determine assigned image
    assigned_img = None
    source_type = None
    if inv_item:
        assigned_img = inv_item.get('primaryImage')
        source_type = "master_inventory (exact)"
    elif cmap_img:
        assigned_img = cmap_img
        source_type = "collectionMap.ts"
    elif col_img:
        assigned_img = col_img
        source_type = "collections.ts"
    elif inv_series:
        assigned_img = inv_series[0].get('primaryImage')
        source_type = f"master_inventory (series {inv_series[0].get('modelNo')})"

    # Check resolved transparent image
    resolved_img = trans_map.get(assigned_img, assigned_img) if assigned_img else None
    
    # Check alpha of resolved image
    is_trans, status = check_img_alpha(resolved_img)
    
    # Check disk candidates for this exact model
    model_candidates = [f for f in all_public.keys() if model.lower() in f.lower()]
    clean_png_candidates = []
    for c in model_candidates:
        if c.lower().endswith('.png'):
            is_c_trans, c_status = check_img_alpha(c)
            if is_c_trans:
                clean_png_candidates.append((c, c_status))

    results.append({
        "num": num,
        "target": target_name,
        "model": model,
        "coll": coll,
        "source_type": source_type,
        "assigned_img": assigned_img,
        "resolved_img": resolved_img,
        "is_transparent": is_trans,
        "status": status,
        "clean_png_candidates": clean_png_candidates,
        "all_model_files": model_candidates
    })

print("\n" + "="*120)
print(f"{'#':<3} {'Target':<22} {'Model':<14} {'Is Trans?':<10} {'Assigned / Resolved Img':<55} {'Status'}")
print("="*120)
for r in results:
    trans_str = "YES (OK)" if r['is_transparent'] else "NO (FIX)"
    assigned_display = (r['resolved_img'] or 'None')[:53]
    print(f"{r['num']:<3} {r['target']:<22} {r['model']:<14} {trans_str:<10} {assigned_display:<55} {r['status']}")

with open('scratch/audit_35_detailed.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
