import json
import os
import glob
from PIL import Image
import numpy as np

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

women = data.get('women', [])
targets = [
    '670SM.2L', '670SM.5L', '788SM.17L', '788SM.2L', '788SM.5L', 
    '794SM.5L', '807GBCRM.13L', '807GBCRM.2L', '807GBCRM.6L', 
    '807RGBCRM.13L', '807RGBCRM.3L', '807RGBCRM.6L'
]

with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    tmap = json.load(f)

print(f"Total women products in inventory: {len(women)}")

for target in targets:
    matched = [p for p in women if p.get('modelNo') == target or target in p.get('modelNo', '')]
    print("=" * 60)
    print(f"TARGET MODEL: {target}")
    if not matched:
        print("  NOT FOUND in women inventory!")
        # Let's search if it exists in men or somewhere else or in line sheet
        in_men = [p for p in data.get('men', []) if p.get('modelNo') == target]
        if in_men:
            print(f"  Found in MEN inventory: {in_men[0]['modelNo']}")
    else:
        for p in matched:
            print(f"  ModelNo: {p.get('modelNo')} | Slug: {p.get('slug')} | Series: {p.get('series')}")
            print(f"  Current primaryImage: {p.get('primaryImage')}")
            print(f"  Current hoverImage: {p.get('hoverImage')}")
            print(f"  Gallery: {p.get('gallery')}")
            mapped_p = tmap.get(p.get('primaryImage'))
            print(f"  Mapped Transparent: {mapped_p}")
            
            # Check source image existence and dimensions
            src_disk = os.path.join('public', p.get('primaryImage', '').lstrip('/'))
            if os.path.exists(src_disk):
                with Image.open(src_disk) as im:
                    print(f"  Source Image size: {im.size}, mode: {im.mode}")
            else:
                print(f"  Source Image NOT FOUND: {src_disk}")
                
            if mapped_p:
                trans_disk = os.path.join('public', mapped_p.lstrip('/'))
                if os.path.exists(trans_disk):
                    with Image.open(trans_disk) as im:
                        arr = np.array(im)
                        alpha = arr[:, :, 3]
                        print(f"  Trans Image size: {im.size}, mean alpha: {np.mean(alpha):.1f}")
                        # Check center dial
                        h, w = alpha.shape
                        center = alpha[int(h*0.35):int(h*0.65), int(w*0.35):int(w*0.65)]
                        print(f"  Trans Center dial mean alpha: {np.mean(center):.1f}, holes: {np.mean(center < 50):.1%}")
                else:
                    print(f"  Trans Image NOT FOUND on disk: {trans_disk}")
            
            # Find all potential files on disk for this model
            clean_target = target.replace('.', '').replace('-', '').replace(' ', '')
            found_files = []
            for root, dirs, files in os.walk('public/images/new-img'):
                for file in files:
                    clean_file = file.replace('.', '').replace('-', '').replace(' ', '').replace('_', '')
                    if clean_target.lower() in clean_file.lower() or target.lower() in file.lower():
                        found_files.append(os.path.join(root, file).replace('\\', '/'))
            
            print(f"  Exact Matching Files on disk ({len(found_files)}):")
            for f in sorted(found_files):
                print(f"    -> {f}")
