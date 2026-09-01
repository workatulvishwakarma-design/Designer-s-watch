from PIL import Image
import numpy as np
import json
import os

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    dsigner = json.load(f)

models = ['200GM.16G', '200RTM.2G', '200RTM.3G', '200SM.2G', '200SM.3G', '200SM.5G']

print("=" * 60)
print("VERIFYING 200 SERIES IN D'SIGNER MEN INVENTORY")
print("=" * 60)

men_items = {item['modelNo']: item for item in dsigner['men']}

for m in models:
    if m not in men_items:
        print(f"FAILED: {m} not found in inventory!")
        continue
    
    item = men_items[m]
    print(f"\nModel: {m}")
    print(f"  Slug: {item['slug']}")
    print(f"  EAN: {item['ean']}")
    print(f"  MRP / Price: Rs {item['mrp']}")
    print(f"  Dial: {item['dialColor']} ({item['dialHex']}) | Strap: {item['strapColor']} ({item['strapHex']})")
    print(f"  Specs: {item['caseMaterial']}, {item['glassMaterial']}, {item['movement']}, {item['waterResistance']}")
    print(f"  Primary Image: {item['primaryImage']}")
    
    # Check transparent file
    with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
        tmap = json.load(f)
    
    trans_path = tmap.get(item['primaryImage'])
    print(f"  Transparent Path: {trans_path}")
    
    if trans_path and os.path.exists('public' + trans_path):
        im = Image.open('public' + trans_path)
        arr = np.array(im)
        alpha = arr[:, :, 3]
        trans_pct = np.mean(alpha < 10)
        solid_pct = np.mean(alpha > 200)
        print(f"  Image status: RGBA OK ({im.size}), Transparent area: {trans_pct:.1%}, Watch solid area: {solid_pct:.1%}")
    else:
        print("  Image status: MISSING FILE!")

print("\nTotal men products in master inventory:", len(dsigner['men']))
