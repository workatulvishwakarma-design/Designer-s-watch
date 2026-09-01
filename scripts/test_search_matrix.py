import json
import re

# Load product datasets
with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    dsigner_inv = json.load(f)

with open('src/data/escort_master_inventory.json', 'r', encoding='utf-8') as f:
    escort_inv = json.load(f)

# Flatten
dsigner_men = dsigner_inv.get('men', [])
dsigner_women = dsigner_inv.get('women', [])
escort_men = escort_inv.get('men', [])
escort_women = escort_inv.get('women', [])

def match_product(p, query):
    q = query.strip().lower()
    if not q:
        return True
    
    tokens = q.split()
    q_clean = re.sub(r'[^a-z0-9]', '', q)
    
    name = (p.get('name') or p.get('modelNo') or '').lower()
    model_num = (p.get('modelNo') or p.get('modelNumber') or '').lower()
    model_fam = (p.get('series') or p.get('modelFamily') or '').lower()
    slug = (p.get('slug') or '').lower()
    brand = (p.get('brand') or '').lower()
    category = (p.get('category') or '').lower()
    desc = (p.get('description') or '').lower()
    ean = (p.get('ean') or '').lower()
    tags = " ".join(p.get('tags', [])).lower()
    colors = " ".join([c.get('name', '') if isinstance(c, dict) else str(c) for c in p.get('colors', [])]).lower()
    
    specs = p.get('specs') or {}
    specs_values = " ".join([str(v) for v in specs.values()]).lower()
    specs_keys = " ".join([str(k) for k in specs.keys()]).lower()
    
    combined = f"{name} {model_num} {model_fam} {slug} {brand} {category} {desc} {ean} {tags} {colors} {specs_values} {specs_keys}"
    combined_clean = re.sub(r'[^a-z0-9]', '', combined)
    
    if q in combined:
        return True
    if q_clean and q_clean in combined_clean:
        return True
    if len(tokens) > 1 and all(
        (t in combined) or (re.sub(r'[^a-z0-9]', '', t) and re.sub(r'[^a-z0-9]', '', t) in combined_clean)
        for t in tokens
    ):
        return True
    return False

test_cases = [
    # (Collection Name, dataset, query, expected_min_matches, description)
    ("D'SIGNER Women", dsigner_women, "670SM.2L", 1, "Exact model number"),
    ("D'SIGNER Women", dsigner_women, "670SM", 2, "Partial model number"),
    ("D'SIGNER Women", dsigner_women, "670", 2, "Numeric-only model query"),
    ("D'SIGNER Women", dsigner_women, "SM", 5, "Letter query"),
    ("D'SIGNER Women", dsigner_women, "gold", 5, "Color query (gold)"),
    ("D'SIGNER Women", dsigner_women, "  670SM.2l  ", 1, "Mixed case with leading/trailing spaces"),
    ("D'SIGNER Women", dsigner_women, "xyznonexistentquery9999", 0, "No results query"),
    ("D'SIGNER Men", dsigner_men, "200GM.16G", 1, "D'SIGNER Men exact model"),
    ("D'SIGNER Men", dsigner_men, "200GM", 1, "D'SIGNER Men partial model"),
    ("D'SIGNER Men", dsigner_men, "gold", 5, "D'SIGNER Men color"),
    ("ESCORT Men", escort_men, "7226", 1, "Escort Men model number query (7226)"),
    ("ESCORT Men", escort_men, "black", 5, "Escort Men color query"),
    ("ESCORT Women", escort_women, "7280", 1, "Escort Women model query (7280)"),
    ("ESCORT Women", escort_women, "1950", 1, "Escort Women model query (1950)"),
    ("ESCORT Women", escort_women, "silver", 5, "Escort Women color query"),
]

print("=" * 80)
print("RUNNING SEARCH MATRIX TESTS")
print("=" * 80)

all_passed = True
for collection, dataset, query, exp_min, desc in test_cases:
    matches = [p for p in dataset if match_product(p, query)]
    count = len(matches)
    passed = count >= exp_min if exp_min > 0 else count == 0
    status = "PASS" if passed else "FAIL"
    if not passed:
        all_passed = False
    print(f"[{status}] {collection:<15} | Query: {query:<25} | Found: {count:<3} (Min: {exp_min}) | {desc}")

print("=" * 80)
print(f"ALL SEARCH MATRIX TESTS PASSED: {all_passed}")
print("=" * 80)
