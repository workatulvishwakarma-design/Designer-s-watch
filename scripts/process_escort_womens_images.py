import os
import json
import shutil
from PIL import Image
import numpy as np
from rembg import remove, new_session

PUBLIC_DIR = 'public'
INVENTORY_FILE = 'src/data/escort_master_inventory.json'
MAP_FILE = 'src/data/transparent_image_map.json'
TRANSPARENT_BASE = 'public/images/transparent-img'

def validate_transparent_image(im_orig, im_trans):
    """
    Strict quality control validation:
    - RGBA mode
    - Same dimensions as original
    - Intact dial center (no transparent holes in watch face)
    - Solid watch foreground (> 10% and < 85%)
    - Transparent background (> 15%)
    - Valid strap continuity
    """
    if im_trans.mode != 'RGBA':
        return False, "Not RGBA mode"
    
    if im_orig.size != im_trans.size:
        return False, f"Dimension mismatch: orig {im_orig.size} vs trans {im_trans.size}"
    
    w, h = im_trans.size
    arr = np.array(im_trans)
    alpha = arr[:, :, 3]
    
    # 1. Dial Center integrity (35% to 65% in both axes)
    center_box = alpha[int(h * 0.35):int(h * 0.65), int(w * 0.35):int(w * 0.65)]
    center_alpha_mean = np.mean(center_box)
    center_holes_pct = np.mean(center_box < 50)
    
    if center_alpha_mean < 210:
        return False, f"Dial center eroded (mean alpha: {center_alpha_mean:.1f})"
    if center_holes_pct > 0.05:
        return False, f"Holes in dial center ({center_holes_pct:.1%})"
    
    # 2. Overall solid and transparent ratios
    trans_pct = np.mean(alpha < 10)
    solid_pct = np.mean(alpha > 200)
    
    if trans_pct < 0.15:
        return False, f"Insufficient background transparency ({trans_pct:.1%})"
    if solid_pct < 0.08 or solid_pct > 0.85:
        return False, f"Suspicious foreground solid ratio ({solid_pct:.1%})"
    
    # 3. Check for severe horizontal slicing/disconnection
    # For every 5% vertical slice between 25% and 75% height, ensure some watch pixels exist
    for y_step in range(25, 75, 5):
        y_slice = alpha[int(h * y_step / 100):int(h * (y_step + 5) / 100), :]
        if np.max(y_slice) < 100:
            return False, f"Watch body disconnected at height {y_step}%"
            
    return True, "Passed all quality checks"

def main():
    print("=" * 70)
    print("ESCORT WOMEN'S PRODUCT IMAGE REPROCESSING & QUALITY ASSURANCE")
    print("=" * 70)
    
    with open(INVENTORY_FILE, 'r', encoding='utf-8') as f:
        escort_data = json.load(f)
    
    women_items = escort_data.get('women', [])
    print(f"Total Escort Women Products in Inventory: {len(women_items)}")
    
    # Collect all unique image paths (primary, hover, gallery)
    all_images = set()
    for item in women_items:
        if item.get('primaryImage'): all_images.add(item['primaryImage'])
        if item.get('hoverImage'): all_images.add(item['hoverImage'])
        for g in item.get('gallery', []):
            if g: all_images.add(g)
            
    print(f"Total Unique Escort Women Source Images: {len(all_images)}")
    
    # Load current transparent map
    if os.path.exists(MAP_FILE):
        with open(MAP_FILE, 'r', encoding='utf-8') as f:
            tmap = json.load(f)
    else:
        tmap = {}
        
    # Remove any stale/damaged escort ladies entries
    tmap = {k: v for k, v in tmap.items() if 'escort/ladies' not in k.lower()}
    
    session = new_session('u2net')
    
    stats = {
        'total': len(all_images),
        'already_transparent_png': 0,
        'jpeg_processed_success': 0,
        'validation_rejected_use_original': 0,
        'missing_source': 0
    }
    
    for idx, orig_rel in enumerate(sorted(all_images), start=1):
        clean_rel = orig_rel.strip().replace('\\', '/')
        src_disk = os.path.join(PUBLIC_DIR, clean_rel.lstrip('/'))
        
        if not os.path.exists(src_disk):
            print(f"[{idx}/{len(all_images)}] MISSING SOURCE: {src_disk}")
            stats['missing_source'] += 1
            continue
            
        sub = clean_rel[len('/images/new-img/'):] if clean_rel.startswith('/images/new-img/') else clean_rel.lstrip('/')
        stem, ext = os.path.splitext(sub)
        trans_rel = f"/images/transparent-img/{stem}.png"
        trans_disk = os.path.join(PUBLIC_DIR, trans_rel.lstrip('/'))
        os.makedirs(os.path.dirname(trans_disk), exist_ok=True)
        
        try:
            im_orig = Image.open(src_disk)
            
            # Case 1: Original is ALREADY a transparent PNG
            if im_orig.mode == 'RGBA' and ext.lower() == '.png':
                arr = np.array(im_orig)
                alpha = arr[:, :, 3]
                trans_pct = np.mean(alpha < 10)
                solid_pct = np.mean(alpha > 200)
                
                if trans_pct > 0.05 and solid_pct > 0.05:
                    # Pristine original transparent PNG: copy directly without degrading
                    im_orig.save(trans_disk, 'PNG')
                    tmap[clean_rel] = trans_rel
                    stats['already_transparent_png'] += 1
                    print(f"[{idx}/{len(all_images)}] PRISTINE ORIGINAL PNG: {clean_rel} (Trans: {trans_pct:.1%}, Solid: {solid_pct:.1%})")
                    continue
            
            # Case 2: Original is JPEG or solid RGB PNG -> Process with rembg
            with open(src_disk, 'rb') as f:
                src_bytes = f.read()
                
            out_bytes = remove(src_bytes, session=session)
            
            import io
            im_trans = Image.open(io.BytesIO(out_bytes))
            
            # Quality Validation Check
            is_valid, reason = validate_transparent_image(im_orig, im_trans)
            
            if is_valid:
                with open(trans_disk, 'wb') as f:
                    f.write(out_bytes)
                tmap[clean_rel] = trans_rel
                stats['jpeg_processed_success'] += 1
                print(f"[{idx}/{len(all_images)}] VALIDATED TRANSPARENT: {clean_rel} -> {reason}")
            else:
                # Reject transparent version and safely use original
                stats['validation_rejected_use_original'] += 1
                # If a corrupted/damaged transparent file exists on disk, delete it
                if os.path.exists(trans_disk):
                    os.remove(trans_disk)
                print(f"[{idx}/{len(all_images)}] REJECTED ({reason}) -> FALLBACK TO ORIGINAL: {clean_rel}")
                
        except Exception as ex:
            print(f"[{idx}/{len(all_images)}] ERROR processing {clean_rel}: {ex} -> FALLBACK TO ORIGINAL")
            stats['validation_rejected_use_original'] += 1
            if os.path.exists(trans_disk):
                os.remove(trans_disk)
                
    # Save updated map
    with open(MAP_FILE, 'w', encoding='utf-8') as f:
        json.dump(tmap, f, indent=2)
        
    print("\n" + "=" * 70)
    print("FINAL ESCORT WOMEN AUDIT REPORT")
    print("=" * 70)
    print(f"TOTAL ESCORT WOMEN UNIQUE IMAGES: {stats['total']}")
    print(f"PRISTINE ORIGINAL PNGS PRESERVED: {stats['already_transparent_png']}")
    print(f"JPEGS PROCESSED & PASSED VALIDATION: {stats['jpeg_processed_success']}")
    print(f"TOTAL VALIDATED TRANSPARENT ASSETS: {stats['already_transparent_png'] + stats['jpeg_processed_success']}")
    print(f"REJECTED (SAFE ORIGINAL FALLBACK USED): {stats['validation_rejected_use_original']}")
    print(f"MISSING SOURCE ASSETS: {stats['missing_source']}")
    print(f"TOTAL ENTRIES IN TRANSPARENT MAP: {len(tmap)}")
    print("=" * 70)

if __name__ == '__main__':
    main()
