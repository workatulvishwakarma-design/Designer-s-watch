import urllib.request
import ssl
import json
import re
import os
from PIL import Image
import numpy as np
from rembg import remove, new_session

ctx = ssl._create_unverified_context()

MYNTRA_SOURCES = {
    '200GM.16G': {
        'styleId': '36482146',
        'url': 'https://www.myntra.com/watches/d-signer/dsigner-men-bracelet-style-dual-time-analogue-watch-200gm16g/36482146/buy'
    },
    '200RTM.2G': {
        'styleId': '36482140',
        'url': 'https://www.myntra.com/watches/dsigner/dsigner-men-dial-bracelet-style-straps-analogue-watch-200rtm2g/36482140/buy'
    },
    '200RTM.3G': {
        'styleId': '36505634',
        'url': 'https://www.myntra.com/watches/dsigner/dsigner-men-dial-bracelet-style-straps-analogue-watch-200rtm3g/36505634/buy'
    },
    '200SM.2G': {
        'styleId': '36505638',
        'url': 'https://www.myntra.com/watches/dsigner/dsigner-men-dial-bracelet-style-straps-analogue-watch-200sm2g/36505638/buy'
    },
    '200SM.3G': {
        'styleId': '36505637',
        'url': 'https://www.myntra.com/watches/dsigner/dsigner-men-bracelet-style-straps-analogue-watch-200sm3g/36505637/buy'
    },
    '200SM.5G': {
        'styleId': '36505636',
        'url': 'https://www.myntra.com/watches/dsigner/dsigner-men-bracelet-style-straps-analogue-watch-200sm5g/36505636/buy'
    },
}

COLOR_HEX_MAP = {
    'Green': '#2E5A3C',
    'Gold': '#D4AF37',
    'Silver': '#E0E0E0',
    'Rose Gold Two Tone': '#B76E79',
    'Black': '#1A1918',
    'Blue': '#1B365D',
}

def download_images_for_model(model, info):
    url = info['url']
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    })
    
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    
    raw_imgs = re.findall(r'https://assets\.myntassets\.com/[^\s"\'\\]+/v1/assets/images/[^\s"\'\\]+\.jpg', html)
    clean_urls = []
    for p in raw_imgs:
        clean = re.sub(r'https://assets\.myntassets\.com/.*?/v1/', 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/', p)
        if clean not in clean_urls:
            clean_urls.append(clean)
    
    # Target directory
    target_dir = os.path.join('public', 'images', 'new-img', 'model-1', '200', model)
    os.makedirs(target_dir, exist_ok=True)
    
    downloaded_paths = []
    for idx, img_url in enumerate(clean_urls, start=1):
        filename = f"{model.split('.')[0]} ({idx}).jpg" if idx > 1 else f"{model.split('.')[0]} (1).jpg"
        dest_path = os.path.join(target_dir, filename)
        
        img_req = urllib.request.Request(img_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        })
        with urllib.request.urlopen(img_req, context=ctx, timeout=20) as img_resp:
            with open(dest_path, 'wb') as f:
                f.write(img_resp.read())
        
        rel_path = f"/images/new-img/model-1/200/{model}/{filename}"
        downloaded_paths.append(rel_path)
        print(f"   [{model}] Saved image {idx}: {rel_path} ({os.path.getsize(dest_path)} bytes)")
    
    return downloaded_paths

def make_transparent(source_rel, rembg_session):
    src_disk = os.path.join('public', source_rel.lstrip('/'))
    sub = source_rel[len('/images/new-img/'):]
    stem, _ = os.path.splitext(sub)
    trans_rel = f"/images/transparent-img/{stem}.png"
    trans_disk = os.path.join('public', trans_rel.lstrip('/'))
    
    os.makedirs(os.path.dirname(trans_disk), exist_ok=True)
    
    with open(src_disk, 'rb') as f:
        src_bytes = f.read()
    
    out_bytes = remove(src_bytes, session=rembg_session)
    with open(trans_disk, 'wb') as f:
        f.write(out_bytes)
    
    im = Image.open(trans_disk)
    arr = np.array(im)
    alpha = arr[:, :, 3]
    trans_pct = np.mean(alpha < 10)
    solid_pct = np.mean(alpha > 200)
    print(f"   [Transparent] {trans_rel} -> Size: {im.size}, Trans: {trans_pct:.1%}, Solid: {solid_pct:.1%}")
    return trans_rel

def main():
    print("=" * 60)
    print("ADDING D'SIGNER 200 SERIES PRODUCTS")
    print("=" * 60)
    
    # 1. Load Line Sheet Parsed Data
    with open('public/line_sheet_parsed.json', 'r', encoding='utf-8') as f:
        line_sheet = json.load(f)
    
    specs_by_model = {}
    for item in line_sheet:
        mno = item.get('__EMPTY_1')
        if mno in MYNTRA_SOURCES:
            specs_by_model[mno] = item
    
    print(f"Found line sheet records for {len(specs_by_model)}/6 models:")
    for mno in specs_by_model:
        print(f" - {mno}: {specs_by_model[mno].get('__EMPTY_5')} dial, {specs_by_model[mno].get('__EMPTY_6')} strap, MRP: {specs_by_model[mno].get('__EMPTY_3')}")
    
    # 2. Download Images
    model_images = {}
    for model, info in MYNTRA_SOURCES.items():
        print(f"\nDownloading images for {model}...")
        downloaded = download_images_for_model(model, info)
        model_images[model] = downloaded
    
    # 3. Generate Transparent PNGs & Update transparent_image_map.json
    print("\nGenerating transparent assets using rembg...")
    session = new_session('u2net')
    
    with open('src/data/transparent_image_map.json', 'r', encoding='utf-8') as f:
        tmap = json.load(f)
    
    for model, imgs in model_images.items():
        for img_rel in imgs:
            trans_rel = make_transparent(img_rel, session)
            tmap[img_rel] = trans_rel
    
    with open('src/data/transparent_image_map.json', 'w', encoding='utf-8') as f:
        json.dump(tmap, f, indent=2)
    print(f"\nUpdated src/data/transparent_image_map.json with all new transparent paths (total entries: {len(tmap)})")
    
    # 4. Load Master Inventory & Add Models
    with open('src/data/dsigner_master_inventory.json', 'r', encoding='utf-8') as f:
        dsigner_master = json.load(f)
    
    existing_model_set = {item['modelNo'].upper() for item in dsigner_master['men']}
    
    new_products = []
    for model, info in MYNTRA_SOURCES.items():
        if model.upper() in existing_model_set:
            print(f"WARNING: Model {model} already in dsigner_master_inventory.json! Skipping duplicate insertion.")
            continue
        
        spec = specs_by_model[model]
        imgs = model_images[model]
        primary_img = imgs[0] if len(imgs) > 0 else ""
        hover_img = imgs[1] if len(imgs) > 1 else primary_img
        
        dial_color = spec.get('__EMPTY_5', '')
        strap_color = spec.get('__EMPTY_6', '')
        dial_hex = COLOR_HEX_MAP.get(dial_color, '#000000')
        strap_hex = COLOR_HEX_MAP.get(strap_color, '#000000')
        
        mrp = int(spec.get('__EMPTY_3', 0))
        price = mrp
        ean = str(spec.get('__EMPTY_2', ''))
        style_id = str(spec.get('__EMPTY_4', ''))
        
        dial_size = f"{spec.get('__EMPTY_7', '')} mm" if spec.get('__EMPTY_7') else ""
        case_size = f"{spec.get('__EMPTY_8', '')} mm" if spec.get('__EMPTY_8') else ""
        band_size = f"{spec.get('__EMPTY_9', '')} mm" if spec.get('__EMPTY_9') else ""
        thickness = f"{spec.get('__EMPTY_10', '')} mm" if spec.get('__EMPTY_10') else ""
        weight = f"{spec.get('__EMPTY_12', '')} gm" if spec.get('__EMPTY_12') else ""
        
        desc = spec.get('__EMPTY_20', '').replace('\n', ' ').strip()
        
        slug = model.lower().replace('.', '-').replace(' ', '-')
        
        product_obj = {
            "modelNo": model,
            "slug": slug,
            "series": "200",
            "ean": ean,
            "mrp": mrp,
            "price": price,
            "styleId": style_id,
            "dialColor": dial_color,
            "dialHex": dial_hex,
            "strapColor": strap_color,
            "strapHex": strap_hex,
            "dialSize": dial_size,
            "caseSize": case_size,
            "bandSize": band_size,
            "thickness": thickness,
            "strapLength": "Standard",
            "weight": weight,
            "dialShape": spec.get('__EMPTY_13', 'Round'),
            "strapMaterial": spec.get('__EMPTY_14', 'Stainless Steel'),
            "watchType": spec.get('__EMPTY_15', 'Analogue'),
            "gender": spec.get('__EMPTY_16', 'Men'),
            "caseMaterial": spec.get('__EMPTY_17', 'Stainless steel'),
            "functionality": spec.get('__EMPTY_18', 'Chronograph'),
            "movement": spec.get('__EMPTY_19', 'Quartz'),
            "description": desc,
            "waterResistance": spec.get('__EMPTY_21', '30 m'),
            "strapClosure": spec.get('__EMPTY_22', 'Folding Clasp'),
            "glassMaterial": spec.get('__EMPTY_23', 'Mineral Glass'),
            "primaryImage": primary_img,
            "hoverImage": hover_img,
            "gallery": imgs
        }
        
        new_products.append(product_obj)
        print(f"Created product record for {model}: {slug}")
    
    # Insert new products into men's collection
    dsigner_master['men'].extend(new_products)
    
    with open('src/data/dsigner_master_inventory.json', 'w', encoding='utf-8') as f:
        json.dump(dsigner_master, f, indent=2)
    
    print(f"\nSuccessfully added {len(new_products)} products to dsigner_master_inventory.json.")
    print(f"Total D'SIGNER Men products now: {len(dsigner_master['men'])}")

if __name__ == '__main__':
    main()
