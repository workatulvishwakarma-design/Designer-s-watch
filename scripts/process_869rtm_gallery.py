import os
import json
from PIL import Image
import numpy as np
from rembg import remove, new_session

session = new_session("u2net")

model = "869RTM.16G"
src_dir = f"public/images/new-img/model-2/869/869/{model}"
dst_dir = f"public/images/transparent-img/model-2/869/869/{model}"
os.makedirs(dst_dir, exist_ok=True)

with open("src/data/transparent_image_map.json", "r", encoding="utf-8") as f:
    tmap = json.load(f)

for i in [1, 2, 3, 4]:
    src_file = f"{src_dir}/869RTM ({i}).jpg"
    dst_file = f"{dst_dir}/869RTM ({i}).png"
    
    if os.path.exists(src_file):
        print(f"Processing {src_file}...")
        im = Image.open(src_file)
        out = remove(im, session=session)
        out.save(dst_file, format="PNG")
        
        arr = np.array(out)
        corners = [int(arr[0,0,3]), int(arr[0,-1,3]), int(arr[-1,0,3]), int(arr[-1,-1,3])]
        trans_ratio = float((arr[:,:,3] == 0).mean())
        print(f"Saved {dst_file} | corners alpha: {corners} | trans: {trans_ratio:.1%}")
        
        rel_src = f"/images/new-img/model-2/869/869/{model}/869RTM ({i}).jpg"
        rel_dst = f"/images/transparent-img/model-2/869/869/{model}/869RTM ({i}).png"
        tmap[rel_src] = rel_dst

with open("src/data/transparent_image_map.json", "w", encoding="utf-8") as f:
    json.dump(tmap, f, indent=2)

print("transparent_image_map.json updated successfully!")
