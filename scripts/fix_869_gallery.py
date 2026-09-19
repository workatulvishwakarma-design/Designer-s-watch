import json

with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
    inv = json.load(f)

updated_count = 0
for cat in ['men', 'women']:
    for x in inv.get(cat, []):
        model = x.get('modelNo', '')
        if '869' in model:
            gallery = x.get('gallery', [])
            png_idx = -1
            for i, img in enumerate(gallery):
                if img.endswith(f'{model}.png'):
                    png_idx = i
                    break
            if png_idx > 0:
                full_png = gallery.pop(png_idx)
                # Put full_png at index 0
                gallery.insert(0, full_png)
                # Move original (1).jpg from index 1 to the end
                if len(gallery) > 1 and '(1)' in gallery[1]:
                    macro_jpg = gallery.pop(1)
                    gallery.append(macro_jpg)
                x['primaryImage'] = full_png
                x['hoverImage'] = gallery[1] if len(gallery) > 1 else full_png
                x['gallery'] = gallery
                updated_count += 1
                print('Updated', model, 'primaryImage =', x['primaryImage'])

with open('src/data/dsigner_master_inventory.json', 'w', encoding='utf-8') as f:
    json.dump(inv, f, indent=2)

print('Successfully updated', updated_count, 'models in dsigner_master_inventory.json')

# Update transparent_image_map.json
with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
    tmap = json.load(f)

for cat in ['men', 'women']:
    for x in inv.get(cat, []):
        model = x.get('modelNo', '')
        if '869' in model:
            full_trans = f'/images/transparent-img/model-2/869/{model}.png'
            tmap[f'/images/new-img/model-2/869/{model}.png'] = full_trans
            # Also alias macro (1).jpg to full_trans
            for k in list(tmap.keys()):
                if '869' in k and '(1).jpg' in k:
                    if f'/{model}/' in k:
                        tmap[k] = full_trans
                        print('Mapped', k, '->', full_trans)

with open('src/data/transparent_image_map.json', 'w', encoding='utf-8') as f:
    json.dump(tmap, f, indent=2)

print('Updated transparent_image_map.json successfully')
