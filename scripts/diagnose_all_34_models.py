import json
import os
from PIL import Image
import numpy as np

targets = [
    ("Breeze 794RTM.9L", ["794RTM.9L"]),
    ("Breeze 794SM.2L", ["794SM.2L"]),
    ("Breeze 794SMSL", ["794SM.5L", "794SMSL"]),
    ("Breeze 794", ["794RTM.16L", "794RTM.2L", "794RTM.5L"]),
    ("Breeze 788", ["788RGM.3L", "788"]),
    ("Vortex 851", ["851GNM.3G", "851RGM.16G", "851RGM.2G", "851SM.5G"]),
    ("Pulse 823BRNL.9G", ["823BRNL.9G"]),
    ("Tidemark 876RTM.9G", ["876RTM.9G"]),
    ("Tactix 200SM.5G", ["200SM.5G"]),
    ("Tactix 865", ["865"]),
    ("Tactix 200", ["200SM.2G", "200SM.3G", "200SM.5G", "200RTM.2G", "200RTM.3G", "200GM.16G"]),
    ("Glimmer 860TM.12L", ["860TM.12L", "860TM.12.L"]),
    ("Glimmer 860TM.16L", ["860TM.16L", "860TM.16.L"]),
    ("Tactix 200RTM.2G", ["200RTM.2G"]),
    ("Tactix 200RTM.3G", ["200RTM.3G"]),
    ("Tactix 200GM.16G", ["200GM.16G"]),
    ("Tactix 875RGGNM.3G", ["875RGGNM.3G"]),
    ("Tactix 804", ["804BM.3G", "804RGM.3G", "804RTM.5G", "804TM.16G"]),
    ("Tactix 875RGBLM.5G", ["875RGBLM.5G"]),
    ("Tactix 200SM.2G", ["200SM.2G"]),
    ("Tactix 200SM.3G", ["200SM.3G"]),
    ("Hallmark 862", ["862GM.16L", "862"]),
    ("Hallmark 912RGM.6L", ["912RGM.6L"]),
    ("Hallmark 912RTM.5L", ["912RTM.5L"]),
    ("Hallmark 777", ["777RTM.6.L", "777"]),
    ("Grandeur 980GFS.16", ["980GFS.16"]),
    ("Hallmark 912TM.6L", ["912TM.6L"]),
    ("Quest 802", ["802GNM.8G", "802GNM.8.G", "802"]),
    ("Duetto 521", ["521GM.16G", "521"]),
    ("Daymark 867", ["867GM.16G", "867GM.2G", "867GM.5G", "867GM.9G", "867RGM.16G", "867RGM.2G", "867RGM.3G", "867SM.2G", "867SM.4G", "867SM.5G", "867SM.8G"]),
    ("Daymark 809", ["809GM.2G", "809GM.4G", "809GNM.16G", "809GNM.3G", "809RGM.16G", "809RGM.2G", "809RTM.16G", "809RTM.2G", "809TM.2G", "809TM.4G"]),
    ("Daymark 829", ["829RGM.9G"]),
    ("Daymark 821", ["821GM.1", "821"]),
    ("Bondline 820", ["820GFS.16G", "820GNFS.16G", "820GNFS.5G", "820GNFS.8G", "820RGFS.2G"]),
]

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    inv = json.load(f)
with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    tmap = json.load(f)

all_items = inv.get('men', []) + inv.get('women', [])

def check_file(rel_path):
    resolved = tmap.get(rel_path, rel_path)
    full = 'public' + resolved if resolved.startswith('/') else 'public/' + resolved
    if not os.path.exists(full):
        return {'status': 'NOT_FOUND', 'path': full}
    im = Image.open(full)
    if im.mode != 'RGBA':
        return {'status': 'OPAQUE', 'path': full, 'size': im.size}
    arr = np.array(im)
    corners = [int(arr[0,0,3]), int(arr[0,-1,3]), int(arr[-1,0,3]), int(arr[-1,-1,3])]
    bbox = im.getchannel('A').getbbox()
    height = (bbox[3] - bbox[1]) if bbox else 0
    height_ratio = height / im.size[1] if im.size[1] else 0
    is_transparent = all(c == 0 for c in corners) and (arr[:,:,3] == 0).mean() > 0.1
    return {
        'status': 'TRANSPARENT' if is_transparent else 'OPAQUE_ALPHA',
        'path': full,
        'size': im.size,
        'bbox': bbox,
        'height': height,
        'height_ratio': height_ratio,
        'corners': corners,
        'trans_ratio': float((arr[:,:,3] == 0).mean())
    }

results = []

for name, skus in targets:
    matched_items = []
    for s in skus:
        for x in all_items:
            num = str(x.get('modelNo', ''))
            if s.lower() in num.lower() and x not in matched_items:
                matched_items.append(x)
    
    if not matched_items:
        results.append({
            'target': name,
            'status': 'NO_INVENTORY_MATCH',
            'skus': skus
        })
        continue
        
    for item in matched_items:
        model_no = item.get('modelNo')
        prim = item.get('primaryImage')
        gallery = item.get('gallery', [])
        
        prim_info = check_file(prim)
        gallery_info = [check_file(g) for g in gallery]
        
        results.append({
            'target': name,
            'modelNo': model_no,
            'primary': prim,
            'prim_info': prim_info,
            'gallery': gallery,
            'gallery_info': gallery_info
        })

print(f"Audited {len(results)} model variations across the 34 targets.")

issues = []
for r in results:
    t = r.get('target')
    m = r.get('modelNo', 'N/A')
    if r.get('status') == 'NO_INVENTORY_MATCH':
        issues.append(f"[{t}] NOT IN MASTER INVENTORY (Check catalog / raw assets)")
        continue
    
    p_info = r['prim_info']
    if p_info['status'] != 'TRANSPARENT':
        issues.append(f"[{t} / {m}] Primary is {p_info['status']} ({r['primary']})")
    elif p_info['height_ratio'] < 0.65:
        issues.append(f"[{t} / {m}] Primary is WRONGLY CROPPED: height_ratio={p_info['height_ratio']:.1%} (bbox={p_info['bbox']}, size={p_info['size']})")
        
    for i, g_info in enumerate(r['gallery_info']):
        if g_info['status'] != 'TRANSPARENT':
            issues.append(f"[{t} / {m}] Gallery[{i}] is {g_info['status']} ({r['gallery'][i]})")
        elif g_info['height_ratio'] < 0.65 and i == 0:
            issues.append(f"[{t} / {m}] Gallery[0] is WRONGLY CROPPED: height_ratio={g_info['height_ratio']:.1%}")

print(f"\nTOTAL ISSUES FOUND: {len(issues)}")
for iss in issues:
    print(" ", iss)
