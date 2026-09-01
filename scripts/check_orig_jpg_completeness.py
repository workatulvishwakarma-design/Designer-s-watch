import os
from PIL import Image

models_to_inspect = {
    '788SM.17L': 'public/images/new-img/model-1/788/788SM.17L/788SM (1).jpg',
    '788SM.2L': 'public/images/new-img/model-1/788/788SM.2L/788SM (1).jpg',
    '788SM.5L': 'public/images/new-img/model-1/788/788SM.5L/788SM (1).jpg',
    '807GBCRM.13L': 'public/images/new-img/model-1/807/807GBCRM.13.L/807GBCRM.13 (1).jpg',
    '807GBCRM.2L': 'public/images/new-img/model-1/807/807GBCRM.2.L/807GBCRM.2 (1).jpg',
    '807GBCRM.6L': 'public/images/new-img/model-1/807/807GBCRM.6.L/807GBCRM.6 (1).jpg',
    '807RGBCRM.13L': 'public/images/new-img/model-1/807/807RGBCRM.13.L/807RGBCRM.13 (1).jpg',
    '807RGBCRM.3L': 'public/images/new-img/model-1/807/807RGBCRM.3.L/807RGBCRM.3 (1).jpg',
    '807RGBCRM.6L': 'public/images/new-img/model-1/807/807RGBCRM.6.L/807RGBCRM.6 (1).jpg',
}

print("=" * 70)
print("CHECKING ORIGINAL JPG COMPLETENESS")
print("=" * 70)

for m, p in models_to_inspect.items():
    if os.path.exists(p):
        im = Image.open(p)
        print(f"Model: {m}")
        print(f"  Path: {p}")
        print(f"  Size: {im.size}")
    else:
        print(f"Model: {m} - File NOT FOUND: {p}")
