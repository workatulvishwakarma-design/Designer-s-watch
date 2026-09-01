import urllib.request
import ssl
import json
import re
import os

ctx = ssl._create_unverified_context()

urls = {
    '200GM.16G': 'https://www.myntra.com/watches/d-signer/dsigner-men-bracelet-style-dual-time-analogue-watch-200gm16g/36482146/buy',
    '200RTM.2G': 'https://www.myntra.com/watches/dsigner/dsigner-men-dial-bracelet-style-straps-analogue-watch-200rtm2g/36482140/buy',
    '200RTM.3G': 'https://www.myntra.com/watches/dsigner/dsigner-men-dial-bracelet-style-straps-analogue-watch-200rtm3g/36505634/buy',
    '200SM.2G': 'https://www.myntra.com/watches/dsigner/dsigner-men-dial-bracelet-style-straps-analogue-watch-200sm2g/36505638/buy',
    '200SM.3G': 'https://www.myntra.com/watches/dsigner/dsigner-men-bracelet-style-straps-analogue-watch-200sm3g/36505637/buy',
    '200SM.5G': 'https://www.myntra.com/watches/dsigner/dsigner-men-bracelet-style-straps-analogue-watch-200sm5g/36505636/buy',
}

results = {}

for model, url in urls.items():
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    })
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Find window.__myx or pdpData or media images
            pdp_match = re.search(r'pdpData\s*=\s*({.*?});', html, re.DOTALL)
            images = []
            if pdp_match:
                try:
                    pdp_json = json.loads(pdp_match.group(1))
                    albums = pdp_json.get('media', {}).get('albums', [])
                    for alb in albums:
                        for img in alb.get('images', []):
                            src = img.get('src')
                            if src:
                                images.append(src)
                except Exception as ex:
                    print(f'{model} pdpData parse error: {ex}')
            
            if not images:
                # Fallback regex for assets.myntassets.com images
                raw_imgs = re.findall(r'https://assets\.myntassets\.com/[^\s"\'\\]+\.(?:jpg|jpeg|png|webp)', html)
                # Filter out generic icons/logos
                images = [img for img in dict.fromkeys(raw_imgs) if 'assets/images' in img or 'h_1440' in img or 'image' in img or 'dpr_' in img or 'f_webp' in img]
            
            print(f'{model} -> Status {resp.status}, found {len(images)} images:')
            for img in images[:6]:
                print('   ->', img)
            
            results[model] = {
                'url': url,
                'images': images
            }
    except Exception as e:
        print(f'{model} -> ERROR: {e}')

with open('scripts/myntra_200_scraped.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

print('Saved results to scripts/myntra_200_scraped.json')
