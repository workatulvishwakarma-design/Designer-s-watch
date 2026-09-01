import json
import os
from PIL import Image
import numpy as np
from rembg import remove, new_session

with open('src/data/escort_master_inventory.json', 'r', encoding='utf-8') as f:
    escort = json.load(f)

women_items = escort.get('women', [])

jpeg_samples = [item for item in women_items if item.get('primaryImage', '').lower().endswith('.jpg')][:10]

print("=" * 60)
print("TESTING ESCORT LADIES JPEG SAMPLES")
print("=" * 60)

session = new_session('u2net')

for item in jpeg_samples:
    mno = item['modelNo']
    rel_path = item['primaryImage']
    src_disk = os.path.join('public', rel_path.lstrip('/'))
    
    im_orig = Image.open(src_disk)
    w, h = im_orig.size
    
    # Run rembg on original source image
    with open(src_disk, 'rb') as f:
        src_bytes = f.read()
    
    out_bytes = remove(src_bytes, session=session)
    
    # Analyze output
    import io
    im_trans = Image.open(io.BytesIO(out_bytes))
    arr = np.array(im_trans)
    alpha = arr[:, :, 3]
    
    # Check top strap (y: 0 to h*0.25)
    top_strap_alpha = np.mean(alpha[:int(h*0.25), :])
    # Check bottom strap (y: h*0.75 to h)
    bottom_strap_alpha = np.mean(alpha[int(h*0.75):, :])
    # Check dial center (y: h*0.35 to h*0.65, x: w*0.35 to w*0.65)
    center_alpha = np.mean(alpha[int(h*0.35):int(h*0.65), int(w*0.35):int(w*0.65)])
    
    total_trans_pct = np.mean(alpha < 10)
    total_solid_pct = np.mean(alpha > 200)
    
    print(f"\nModel: {mno} | {rel_path}")
    print(f"  Orig Size: {im_orig.size} | Trans Size: {im_trans.size}")
    print(f"  Center dial alpha: {center_alpha:.1f} (should be ~255)")
    print(f"  Top strap alpha: {top_strap_alpha:.1f}")
    print(f"  Bottom strap alpha: {bottom_strap_alpha:.1f}")
    print(f"  Total Transparent: {total_trans_pct:.1%} | Total Solid: {total_solid_pct:.1%}")
    
    # Quality verdict:
    # If center dial is eroded (center_alpha < 180) or strap is missing when original had it:
    is_good = (center_alpha > 220) and (total_solid_pct > 0.08) and (total_trans_pct > 0.15)
    print(f"  Validation Verdict: {'PASSED (Crisp watch, intact dial & body)' if is_good else 'REJECTED -> KEEP ORIGINAL'}")
