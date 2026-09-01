import os
from PIL import Image
import numpy as np

files_to_check = [
    # 788
    'public/images/new-img/model-1/788/788SM.17L/788SM (1).jpg',
    'public/images/new-img/model-1/788/788SM.17L/788SM (2).jpg',
    'public/images/new-img/model-1/788/788SM.17L/788SM (3).jpg',
    'public/images/new-img/model-1/788/788SM.2L/788SM (1).jpg',
    'public/images/new-img/model-1/788/788SM.5L/788SM (1).jpg',
    # 807
    'public/images/new-img/model-1/807/807GBCRM.13.L/807GBCRM.13 (1).jpg',
    'public/images/new-img/model-1/807/807GBCRM.2.L/807GBCRM.2 (1).jpg',
    'public/images/new-img/model-1/807/807GBCRM.6.L/807GBCRM.6 (1).jpg',
    'public/images/new-img/model-1/807/807RGBCRM.13.L/807RGBCRM.13 (1).jpg',
    'public/images/new-img/model-1/807/807RGBCRM.3.L/807RGBCRM.3 (1).jpg',
    'public/images/new-img/model-1/807/807RGBCRM.6.L/807RGBCRM.6 (1).jpg',
]

print("=" * 70)
print("INSPECTING ORIGINAL SOURCE JPGS")
print("=" * 70)

for f in files_to_check:
    if os.path.exists(f):
        im = Image.open(f)
        arr = np.array(im)
        # Check background brightness (corners)
        tl = np.mean(arr[:50, :50])
        br = np.mean(arr[-50:, -50:])
        # Check top center and bottom center (where strap would be)
        h, w, _ = arr.shape
        top_center = np.mean(arr[:int(h*0.2), int(w*0.3):int(w*0.7)])
        bot_center = np.mean(arr[int(h*0.8):, int(w*0.3):int(w*0.7)])
        print(f"\nFile: {f}")
        print(f"  Size: {im.size}")
        print(f"  Corners avg brightness: {(tl+br)/2:.1f}")
        print(f"  Top center avg brightness: {top_center:.1f}")
        print(f"  Bottom center avg brightness: {bot_center:.1f}")
    else:
        print(f"File NOT FOUND: {f}")
