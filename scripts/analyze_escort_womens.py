import json, os
from PIL import Image

with open('src/data/escort_master_inventory.json', 'r', encoding='utf-8') as f:
    master = json.load(f)

with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    trans_map = json.load(f)

women = master.get('women', [])
print('Total Escort Women products:', len(women))

def check_file(rel_path):
    if not rel_path: return None
    clean = rel_path.strip().replace('\\', '/')
    mapped = trans_map.get(clean, clean)
    disk_p = os.path.join('public', mapped.lstrip('/'))
    if not os.path.exists(disk_p):
        disk_p = os.path.join('public', clean.lstrip('/'))
    if not os.path.exists(disk_p):
        return None
    try:
        with Image.open(disk_p) as im:
            mode = im.mode
            w, h = im.size
            if mode != 'RGBA':
                return {'is_rgba': False, 'mode': mode, 'size': (w, h), 'path': disk_p, 'h_ratio': 1.0}
            alpha = im.getchannel('A')
            bbox = alpha.getbbox()
            h_ratio = (bbox[3] - bbox[1]) / h if bbox else 0
            return {'is_rgba': True, 'mode': mode, 'size': (w, h), 'path': disk_p, 'h_ratio': h_ratio, 'bbox': bbox}
    except:
        return None

issues = []
for idx, p in enumerate(women):
    m = p['modelNo']
    pri = p.get('primaryImage', '')
    pri_info = check_file(pri)
    
    is_problem = False
    reason = ''
    if not pri_info:
        is_problem = True
        reason = 'missing file'
    elif not pri_info['is_rgba']:
        is_problem = True
        reason = 'non-transparent (' + pri_info['mode'] + ')'
    elif pri_info['h_ratio'] < 0.85:
        hr = pri_info['h_ratio']
        is_problem = True
        reason = f'cut strap (h_ratio={hr:.2f})'
        
    alts = []
    for g in p.get('gallery', []):
        gi = check_file(g)
        if gi:
            alts.append((g, gi))
            
    folder = os.path.dirname(os.path.join('public', pri.lstrip('/')))
    folder_files = os.listdir(folder) if os.path.exists(folder) else []
    
    if is_problem:
        issues.append({
            'idx': idx,
            'model': m,
            'reason': reason,
            'pri': pri,
            'pri_info': pri_info,
            'alts': alts,
            'folder': folder,
            'folder_files': folder_files
        })

print('Total issues found in Escort Women:', len(issues))
for it in issues:
    print(f"[{it['idx']+1}] {it['model']} -> REASON: {it['reason']}")
    print(f"   Primary: {it['pri']}")
    print(f"   Folder: {it['folder']} -> {it['folder_files']}")
    for g, gi in it['alts']:
        print(f"   Gallery: {g} -> is_rgba={gi['is_rgba']}, h_ratio={gi['h_ratio']:.2f}, path={gi['path']}")
