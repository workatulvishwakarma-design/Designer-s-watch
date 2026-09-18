import openpyxl
import json
import re

# Load Excel
wb = openpyxl.load_workbook(r'public/images/new-img/Collection Names Selected (2).xlsx')
sheet = wb["D'signer"]

# 1. Parse Excel data
excel_data = {} # collection_name -> list of raw model strings
model_to_collection = {}

for r in range(3, sheet.max_row + 1):
    cname = sheet.cell(row=r, column=1).value
    if not cname: continue
    cname = str(cname).strip()
    meaning = sheet.cell(row=r, column=2).value
    models = []
    for c in range(3, sheet.max_column + 1):
        v = sheet.cell(row=r, column=c).value
        if v is not None:
            v_str = str(v).strip()
            models.append(v_str)
            # Map specific models/numbers to cname
            # Handle specials:
            # '820G(gents) & 850L (ladies)'
            if '&' in v_str:
                for num in re.findall(r'\d+', v_str):
                    model_to_collection[num] = cname
                for code in re.findall(r'(\d+[A-Za-z]*)', v_str):
                    model_to_collection[code.upper()] = cname
            else:
                # 'Grandeur 360' -> '360', 'Grandeur 360'
                for num in re.findall(r'\d+', v_str):
                    model_to_collection[num] = cname
                clean_v = re.sub(r'^(Grandeur|Tactix|Stratos)\s*', '', v_str, flags=re.I).strip()
                if clean_v:
                    model_to_collection[clean_v.upper()] = cname
                model_to_collection[v_str.upper()] = cname
    excel_data[cname] = {
        "meaning": str(meaning).strip() if meaning else "",
        "models": models
    }

# Known series additions in existing codebase that correspond to collections:
model_to_collection['915'] = 'Grandeur'
model_to_collection['875'] = 'Tactix'
model_to_collection['980'] = 'Grandeur'
model_to_collection['J905'] = 'Echo'

# For unmapped classic series, fallback to 'Classic'
# (such as 849, 962, or any unmapped 701)

# Load master inventory
with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    master_inv = json.load(f)

men_items = master_inv.get('men', [])
women_items = master_inv.get('women', [])

def get_collection_for_model(model_no, series):
    m_clean = str(model_no).strip().upper()
    s_clean = str(series).strip().upper()
    
    # 1. Exact model match
    if m_clean in model_to_collection:
        return model_to_collection[m_clean]
    # 2. Exact series match
    if s_clean in model_to_collection:
        return model_to_collection[s_clean]
    # 3. Numeric series match
    s_num = re.search(r'\d+', s_clean)
    if s_num and s_num.group(0) in model_to_collection:
        return model_to_collection[s_num.group(0)]
    # 4. Model prefix digits
    m_num = re.search(r'\d+', m_clean)
    if m_num and m_num.group(0) in model_to_collection:
        return model_to_collection[m_num.group(0)]
    
    return "Classic"

print(f"Auditing all {len(men_items)} Men + {len(women_items)} Women D'SIGNER items:")

men_mapped = []
for item in men_items:
    col = get_collection_for_model(item['modelNo'], item['series'])
    prod_name = f"{col} {item['modelNo']}"
    men_mapped.append((item['modelNo'], item['series'], col, prod_name))

women_mapped = []
for item in women_items:
    col = get_collection_for_model(item['modelNo'], item['series'])
    prod_name = f"{col} {item['modelNo']}"
    women_mapped.append((item['modelNo'], item['series'], col, prod_name))

print(f"Men items mapped: {len(men_mapped)}")
print(f"Women items mapped: {len(women_mapped)}")

# Sample print of final names:
print("\nSample Men final product names:")
for m in men_mapped[:10]:
    print(f"  {m[0]:15s} -> {m[3]}")

print("\nSample Women final product names:")
for w in women_mapped[:10]:
    print(f"  {w[0]:15s} -> {w[3]}")

# Breakdown by collection:
from collections import Counter
men_col_counts = Counter(m[2] for m in men_mapped)
women_col_counts = Counter(w[2] for w in women_mapped)
total_col_counts = Counter(m[2] for m in men_mapped + women_mapped)

print("\n=== TOTAL WATCHES PER COLLECTION ===")
for col, count in total_col_counts.most_common():
    print(f"  {col:15s}: {count:3d} watches (Men: {men_col_counts.get(col, 0)}, Women: {women_col_counts.get(col, 0)})")
