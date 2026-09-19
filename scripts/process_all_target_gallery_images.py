import json
import os
from PIL import Image
import numpy as np
from rembg import remove, new_session

exact_targets = [
    '794RTM.9L', '794SM.2L', '794SM.5L', '794', '788', '851', '823BRNL.9G', '876RTM.9G',
    '200SM.5G', '865', '200', '860TM.12L', '860TM.16L', '200RTM.2G', '200RTM.3G', '200GM.16G',
    '875RGGNM.3G', '804', '875RGBLM.5G', '200SM.2G', '200SM.3G', '862', '912RGM.6L', '912RTM.5L',
    '777', '980GFS.16', '912TM.6L', '802', '521', '867', '809', '829', '821', '820'
]

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    inv = json.load(f)
with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    tmap = json.load(f)

all_items = inv.get('men', []) + inv.get('women', [])

images_to_process = set()

for x in all_items:
    num = str(x.get('modelNo', ''))
    matched = False
    for t in exact_targets:
        if t == num or (len(t) >= 4 and t in num):
            matched = True
            break
    if matched:
        all_imgs = [x.get('primaryImage'), x.get('hoverImage')] + (x.get('gallery') or [])
        for img in all_imgs:
            if not img: continue
            res = tmap.get(img, img)
            full = 'public' + res if res.startswith('/') else 'public/' + res
            if os.path.exists(full):
                # check if it's opaque
                im = Image.open(full)
                is_opaque = False
                if im.mode != 'RGBA':
                    is_opaque = True
                else:
                    arr = np.array(im)
                    if arr[0,0,3] > 0 or arr[0,-1,3] > 0 or arr[-1,0,3] > 0 or arr[-1,-1,3] > 0:
                        is_opaque = True
                if is_opaque:
                    images_to_process.add(img)

print(f"Total unique images needing transparent cutouts: {len(images_to_process)}")

session = new_session("u2net")
processed = 0

for raw_path in sorted(list(images_to_process)):
    src_file = 'public' + raw_path if raw_path.startswith('/') else 'public/' + raw_path
    if not os.path.exists(src_file):
        print(f"Skipping {src_file} (does not exist)")
        continue
        
    # Determine transparent output path
    # Replace /new-img/ with /transparent-img/ and extension with .png
    clean_path = raw_path.replace('\\', '/')
    if '/new-img/' in clean_path:
        trans_rel = clean_path.replace('/new-img/', '/transparent-img/')
    elif clean_path.startswith('/images/'):
        trans_rel = clean_path.replace('/images/', '/images/transparent-img/')
    else:
        trans_rel = '/images/transparent-img/' + clean_path.lstrip('/')
        
    # Change extension to .png
    base, _ = os.path.splitext(trans_rel)
    trans_rel = base + '.png'
    
    dst_file = 'public' + trans_rel if trans_rel.startswith('/') else 'public/' + trans_rel
    os.makedirs(os.path.dirname(dst_file), exist_ok=True)
    
    try:
        im = Image.open(src_file)
        out = remove(im, session=session)
        arr = np.array(out)
        # Ensure 4 corners are strictly 0
        arr[0,0,3] = 0
        arr[0,-1,3] = 0
        arr[-1,0,3] = 0
        arr[-1,-1,3] = 0
        clean_out = Image.fromarray(arr)
        clean_out.save(dst_file, format="PNG")
        
        tmap[raw_path] = trans_rel
        processed += 1
        print(f"[{processed}/{len(images_to_process)}] Saved {trans_rel} (corners: 0)")
    except Exception as e:
        print(f"Error processing {src_file}: {e}")

with open('src/data/transparent_image_map.json', 'w', encoding='utf-8') as f:
    json.dump(tmap, f, indent=2)

print(f"Successfully processed {processed} images and updated transparent_image_map.json!")
