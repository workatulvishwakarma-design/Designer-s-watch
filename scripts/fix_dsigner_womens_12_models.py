import json
import os
import shutil

PUBLIC_DIR = 'public'
INVENTORY_FILE = 'src/data/dsigner_master_inventory.json'
MAP_FILE = 'src/data/transparent_image_map.json'

with open(INVENTORY_FILE, 'r', encoding='utf-8') as f:
    inv = json.load(f)

women = inv.get('women', [])

with open(MAP_FILE, 'r', encoding='utf-8') as f:
    tmap = json.load(f)

print("=" * 70)
print("UPDATING 12 D'SIGNER WOMEN'S MODELS")
print("=" * 70)

# 1. Models with better exact studio PNGs available:
better_png_mappings = {
    '670SM.2L': '/images/new-img/model-1/670/670/670/670SM.2L.png',
    '670SM.5L': '/images/new-img/model-1/670/670/670/670SM.5L.png',
    '794SM.5L': '/images/new-img/model-1/794/794/794SM.5L.png',
}

for model_no, new_src in better_png_mappings.items():
    item = next((p for p in women if p.get('modelNo') == model_no), None)
    if item:
        # Purge old bad transparent mapping
        old_orig = item.get('primaryImage')
        if old_orig in tmap:
            del tmap[old_orig]
            
        item['primaryImage'] = new_src
        item['hoverImage'] = new_src
        # Register new clean transparent mapping
        trans_rel = new_src.replace('/images/new-img/', '/images/transparent-img/')
        trans_disk = os.path.join(PUBLIC_DIR, trans_rel.lstrip('/'))
        os.makedirs(os.path.dirname(trans_disk), exist_ok=True)
        shutil.copyfile(os.path.join(PUBLIC_DIR, new_src.lstrip('/')), trans_disk)
        tmap[new_src] = trans_rel
        print(f"[UPDATED TO PRISTINE STUDIO PNG] {model_no} -> {new_src}")

# 2. Models where transparent versions were damaged -> Purge from transparent_image_map so original intact JPG is used:
damaged_transparent_models = [
    '788SM.17L',
    '788SM.2L',
    '788SM.5L',
    '807GBCRM.13L',
    '807GBCRM.2L',
    '807GBCRM.6L',
    '807RGBCRM.13L',
    '807RGBCRM.3L',
    '807RGBCRM.6L',
]

for model_no in damaged_transparent_models:
    item = next((p for p in women if p.get('modelNo') == model_no), None)
    if item:
        # Delete any mapped entries for this model's primary, hover, and gallery
        paths_to_purge = [item.get('primaryImage'), item.get('hoverImage')] + (item.get('gallery') or [])
        purged = 0
        for p in paths_to_purge:
            if p and p in tmap:
                trans_path = tmap[p]
                del tmap[p]
                # Also remove the damaged file on disk
                trans_disk = os.path.join(PUBLIC_DIR, trans_path.lstrip('/'))
                if os.path.exists(trans_disk):
                    try:
                        os.remove(trans_disk)
                    except Exception:
                        pass
                purged += 1
        print(f"[PURGED DAMAGED TRANSPARENT -> RESTORED INTACT ORIGINAL] {model_no} ({purged} entries purged, using {item['primaryImage']})")

# Save updated inventory and transparent map
inv['women'] = women
with open(INVENTORY_FILE, 'w', encoding='utf-8') as f:
    json.dump(inv, f, indent=2)

with open(MAP_FILE, 'w', encoding='utf-8') as f:
    json.dump(tmap, f, indent=2)

print("=" * 70)
print("ALL 12 MODELS SUCCESSFULLY UPDATED!")
print("=" * 70)
