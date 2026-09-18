import urllib.request
import json
import time

BASE_URL = "http://localhost:3000"

endpoints = [
    # Core Public Pages
    ("/", "Root Landing"),
    ("/home-2", "Home 2 Page"),
    ("/about-5", "About Heritage 5"),
    ("/pillar-4", "Pillars / Divisions"),
    ("/contact", "Contact Page"),
    ("/nagpal-group", "Nagpal Group Corporate"),
    ("/cart", "Cart Page"),
    ("/checkout", "Checkout Page"),
    ("/cookie-policy", "Cookie Policy"),
    ("/privacy-policy", "Privacy Policy"),
    ("/shipping-policy", "Shipping Policy"),
    ("/terms-and-conditions", "Terms & Conditions"),
    ("/return-cancellation-policy", "Return & Cancellation"),

    # D'SIGNER Collections
    ("/collections", "Collections Directory"),
    ("/collections/grandeur", "Grandeur Collection"),
    ("/collections/eternal", "Eternal Collection"),
    ("/collections/serene", "Serene Collection"),
    ("/collections/glimmer", "Glimmer Collection"),
    ("/collections/hallmark", "Hallmark Collection"),
    ("/collections/dsigner-men", "D'SIGNER Men Collection"),
    ("/collections/dsigner-womens", "D'SIGNER Women Collection"),
    ("/collections/Escort-men", "Escort Men Collection"),
    ("/collections/Escort-womens", "Escort Women Collection"),

    # API Endpoints
    ("/api/stores", "Stores API"),
    ("/api/delivery/check-pincode?pincode=110001", "Pincode Delivery Check API"),
]

print("=" * 80)
print("RUNNING COMPREHENSIVE END-TO-END QA SUITE")
print("=" * 80)

passed = 0
failed = 0

for path, desc in endpoints:
    url = f"{BASE_URL}{path}"
    start = time.time()
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "QABot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            dur = time.time() - start
            data = resp.read()
            print(f"[HTTP {resp.status} OK] {path:<45} {desc:<30} ({dur:.2f}s, {len(data):,} bytes)")
            passed += 1
    except urllib.error.HTTPError as e:
        if e.code in (302, 307, 308, 401):
            print(f"[HTTP {e.code} REDIRECT] {path:<45} {desc:<30} (Expected auth barrier)")
            passed += 1
        else:
            print(f"[HTTP {e.code} FAIL] {path:<45} {desc:<30} -> {e}")
            failed += 1
    except Exception as e:
        print(f"[ERROR] {path:<45} {desc:<30} -> {e}")
        failed += 1

print("=" * 80)
print(f"QA RESULTS: {passed} PASSED, {failed} FAILED (TOTAL {len(endpoints)})")
print("=" * 80)
