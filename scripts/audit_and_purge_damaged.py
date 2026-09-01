import json
import os
from PIL import Image
import numpy as np

PUBLIC_DIR = 'public'
MAP_FILE = 'src/data/transparent_image_map.json'

def validate_image_pair(orig_disk, trans_disk):
    try:
        im_orig = Image.open(orig_disk)
        im_trans = Image.open(trans_disk)
        
        if im_trans.mode != 'RGBA':
            return False, "Not RGBA"
            
        w, h = im_trans.size
        arr = np.array(im_trans)
        alpha = arr[:, :, 3]
        
        # Dial Center integrity (35% to 65% in both axes)
        center_box = alpha[int(h * 0.35):int(h * 0.65), int(w * 0.35):int(w * 0.65)]
        center_alpha_mean = np.mean(center_box)
        center_holes_pct = np.mean(center_box < 50)
        
        if center_alpha_mean < 205:
            return False, f"Dial center eroded (mean: {center_alpha_mean:.1f})"
        if center_holes_pct > 0.05:
            return False, f"Holes in dial center ({center_holes_pct:.1%})"
            
        trans_pct = np.mean(alpha < 10)
        solid_pct = np.mean(alpha > 200)
        
        if trans_pct < 0.12:
            return False, f"Low transparency ({trans_pct:.1%})"
        if solid_pct < 0.07 or solid_pct > 0.88:
            return False, f"Abnormal solid ratio ({solid_pct:.1%})"
            
        # Check continuity
        for y_step in range(25, 75, 5):
            y_slice = alpha[int(h * y_step / 100):int(h * (y_step + 5) / 100), :]
            if np.max(y_slice) < 90:
                return False, f"Disconnected body at {y_step}%"
                
        return True, "Passed"
    except Exception as e:
        return False, f"Error: {e}"

def main():
    print("=" * 70)
    print("GLOBAL AUDIT & PURGE OF ANY DAMAGED TRANSPARENT IMAGES")
    print("=" * 70)
    
    with open(MAP_FILE, 'r', encoding='utf-8') as f:
        tmap = json.load(f)
        
    print(f"Total initial mapped entries: {len(tmap)}")
    
    cleaned_map = {}
    purged_count = 0
    passed_count = 0
    
    for orig_rel, trans_rel in tmap.items():
        orig_disk = os.path.join(PUBLIC_DIR, orig_rel.lstrip('/'))
        trans_disk = os.path.join(PUBLIC_DIR, trans_rel.lstrip('/'))
        
        if not os.path.exists(orig_disk):
            continue
            
        if not os.path.exists(trans_disk):
            continue
            
        is_valid, reason = validate_image_pair(orig_disk, trans_disk)
        
        if is_valid:
            cleaned_map[orig_rel] = trans_rel
            passed_count += 1
        else:
            purged_count += 1
            print(f"Purging damaged transparent asset: {orig_rel} -> {reason}")
            # Delete damaged transparent file if exists
            if os.path.exists(trans_disk):
                try:
                    os.remove(trans_disk)
                except Exception:
                    pass
                    
    with open(MAP_FILE, 'w', encoding='utf-8') as f:
        json.dump(cleaned_map, f, indent=2)
        
    print("\n" + "=" * 70)
    print("GLOBAL AUDIT SUMMARY")
    print("=" * 70)
    print(f"TOTAL VALIDATED CLEAN TRANSPARENT ASSETS: {passed_count}")
    print(f"DAMAGED ASSETS PURGED (FALLBACK TO ORIGINAL SOURCE): {purged_count}")
    print(f"CLEAN ENTRIES SAVED TO MAP: {len(cleaned_map)}")
    print("=" * 70)

if __name__ == '__main__':
    main()
