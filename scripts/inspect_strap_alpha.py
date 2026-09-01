import os
import json
from PIL import Image
import numpy as np

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    inv = json.load(f)

women = inv.get('women', [])

with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    tmap = json.load(f)

targets = [
    '670SM.2L', '670SM.5L', '788SM.17L', '788SM.2L', '788SM.5L', 
    '794SM.5L', '807GBCRM.13L', '807GBCRM.2L', '807GBCRM.6L', 
    '807RGBCRM.13L', '807RGBCRM.3L', '807RGBCRM.6L'
]

for target in targets:
    item = next((p for p in women if p.get('modelNo') == target), None)
    if not item:
        continue
    orig_rel = item['primaryImage']
    orig_disk = os.path.join('public', orig_rel.lstrip('/'))
    trans_rel = tmap.get(orig_rel)
    trans_disk = os.path.join('public', trans_rel.lstrip('/')) if trans_rel else None
    
    print("=" * 60)
    print(f"MODEL: {target}")
    print(f"  Orig: {orig_rel}")
    if os.path.exists(orig_disk):
        im_o = Image.open(orig_disk)
        print(f"  Orig size: {im_o.size}, mode: {im_o.mode}")
    else:
        print(f"  Orig disk MISSING!")
        
    print(f"  Trans: {trans_rel}")
    if trans_disk and os.path.exists(trans_disk):
        im_t = Image.open(trans_disk)
        arr = np.array(im_t)
        alpha = arr[:, :, 3]
        # Check top strap, bottom strap, left/right lugs
        h, w = alpha.shape
        top_strap = np.mean(alpha[:int(h*0.25), :])
        bottom_strap = np.mean(alpha[int(h*0.75):, :])
        print(f"  Trans size: {im_t.size}")
        print(f"  Top strap alpha: {top_strap:.1f}")
        print(f"  Bottom strap alpha: {bottom_strap:.1f}")
        print(f"  Total solid pct: {np.mean(alpha > 200):.1%}")
        print(f"  Total transparent pct: {np.mean(alpha < 10):.1%}")
    else:
        print(f"  Trans disk NOT FOUND")
