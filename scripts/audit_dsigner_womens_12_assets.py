import os
import json
from PIL import Image
import numpy as np

targets = [
    '670SM.2L', '670SM.5L', '788SM.17L', '788SM.2L', '788SM.5L', 
    '794SM.5L', '807GBCRM.13L', '807GBCRM.2L', '807GBCRM.6L', 
    '807RGBCRM.13L', '807RGBCRM.3L', '807RGBCRM.6L'
]

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    inv = json.load(f)

women = inv.get('women', [])

with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    tmap = json.load(f)

print("=" * 80)
print("DETAILED ASSET AUDIT FOR 12 D'SIGNER WOMEN MODELS")
print("=" * 80)

for target in targets:
    item = next((p for p in women if p.get('modelNo') == target), None)
    print(f"\n>>> TARGET: {target}")
    if not item:
        print("  [STATUS] NOT IN WOMEN INVENTORY")
        continue
        
    print(f"  Current primaryImage: {item['primaryImage']}")
    print(f"  Current mapped: {tmap.get(item['primaryImage'])}")
    
    # Find all potential files on disk in new-img
    clean = target.replace('.', '').replace('-', '').replace(' ', '').lower()
    matches = []
    for root, dirs, files in os.walk('public/images/new-img'):
        for file in files:
            cfile = file.replace('.', '').replace('-', '').replace(' ', '').replace('_', '').lower()
            cpath = os.path.join(root, file).replace('\\', '/').lower()
            if clean in cfile or clean in cpath:
                matches.append(os.path.join(root, file).replace('\\', '/'))
                
    print(f"  Matching files found ({len(matches)}):")
    for m in matches:
        disk_path = m
        with Image.open(disk_path) as im:
            print(f"    - {m} | size: {im.size} | mode: {im.mode}")
            if im.mode == 'RGBA':
                arr = np.array(im)
                alpha = arr[:, :, 3]
                print(f"      Alpha info: mean={np.mean(alpha):.1f}, transparent={np.mean(alpha < 10):.1%}, solid={np.mean(alpha > 200):.1%}")
                
    # Also check what transparent image was created
    curr_mapped = tmap.get(item['primaryImage'])
    if curr_mapped:
        trans_path = os.path.join('public', curr_mapped.lstrip('/'))
        if os.path.exists(trans_path):
            with Image.open(trans_path) as im:
                arr = np.array(im)
                alpha = arr[:, :, 3]
                print(f"  Currently mapped trans file: {curr_mapped} | mean alpha={np.mean(alpha):.1f}")
                # check dial center and strap
                h, w = alpha.shape
                center = alpha[int(h*0.35):int(h*0.65), int(w*0.35):int(w*0.65)]
                print(f"  Center dial: mean={np.mean(center):.1f}, holes={np.mean(center < 50):.1%}")
