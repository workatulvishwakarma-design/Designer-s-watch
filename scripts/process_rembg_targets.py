import os
from PIL import Image
from rembg import remove, new_session

# Initialize rembg session
session = new_session("u2net")

tasks = [
    {
        "model": "200RTM.2G",
        "input": "public/images/new-img/model-1/200/200RTM.2G/200RTM (1).jpg",
        "output": "public/images/transparent-img/model-1/200/200RTM.2G/200RTM (1).png",
        "orig_key": "/images/new-img/model-1/200/200RTM.2G/200RTM (1).jpg",
        "trans_val": "/images/transparent-img/model-1/200/200RTM.2G/200RTM (1).png"
    },
    {
        "model": "200GM.16G",
        "input": "public/images/new-img/model-1/200/200GM.16G/200GM (1).jpg",
        "output": "public/images/transparent-img/model-1/200/200GM.16G/200GM (1).png",
        "orig_key": "/images/new-img/model-1/200/200GM.16G/200GM (1).jpg",
        "trans_val": "/images/transparent-img/model-1/200/200GM.16G/200GM (1).png"
    },
    {
        "model": "875RGGNM.3G",
        "input": "public/images/models/875RGGNM.3G.jpg",
        "output": "public/images/transparent-img/models/875RGGNM.3G.png",
        "orig_key": "/images/models/875RGGNM.3G.jpg",
        "trans_val": "/images/transparent-img/models/875RGGNM.3G.png"
    },
    {
        "model": "875RGBLM.5G",
        "input": "public/images/models/875RGBLM.5G.jpg",
        "output": "public/images/transparent-img/models/875RGBLM.5G.png",
        "orig_key": "/images/models/875RGBLM.5G.jpg",
        "trans_val": "/images/transparent-img/models/875RGBLM.5G.png"
    },
    {
        "model": "980GFS.16",
        "input": "public/images/models/980GFS.16.jpg",
        "output": "public/images/transparent-img/models/980GFS.16.png",
        "orig_key": "/images/models/980GFS.16.jpg",
        "trans_val": "/images/transparent-img/models/980GFS.16.png"
    },
    {
        "model": "777RTM.6.L",
        "input": "public/images/new-img/model-1/777/777RTM.6.L.jpeg",
        "output": "public/images/transparent-img/model-1/777/777RTM.6.L.png",
        "orig_key": "/images/new-img/model-1/777/777RTM.6.L.jpeg",
        "trans_val": "/images/transparent-img/model-1/777/777RTM.6.L.png"
    },
    {
        "model": "821GM.1",
        "input": "public/images/new-img/model-1/821/821GM.1.G/821GM.1 (1).jpg",
        "output": "public/images/transparent-img/model-1/821/821GM.1.G/821GM.1.png",
        "orig_key": "/images/new-img/model-1/821/821GM.1.G/821GM.1 (1).jpg",
        "trans_val": "/images/transparent-img/model-1/821/821GM.1.G/821GM.1.png"
    },
    {
        "model": "794SM.5L",
        "input": "public/images/new-img/model-1/794/794SM.5L/794SM (1).jpg",
        "output": "public/images/transparent-img/model-1/794/794SM.5L/794SM (1).png",
        "orig_key": "/images/new-img/model-1/794/794SM.5L/794SM (1).jpg",
        "trans_val": "/images/transparent-img/model-1/794/794SM.5L/794SM (1).png"
    }
]

print("Processing background removal for 8 models...")

for t in tasks:
    in_path = t["input"]
    out_path = t["output"]
    print(f"\nProcessing {t['model']}: {in_path} -> {out_path}")
    
    if not os.path.exists(in_path):
        print(f"  ❌ Input file not found: {in_path}")
        continue
        
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    
    im = Image.open(in_path)
    # Remove background with rembg
    result = remove(im, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10)
    
    # Save as PNG
    result.save(out_path, format="PNG", optimize=True)
    
    # Verify result
    res_im = Image.open(out_path)
    alpha = res_im.split()[3]
    ext = alpha.getextrema()
    hist = alpha.histogram()
    trans_pct = sum(hist[:50]) / (res_im.size[0] * res_im.size[1]) * 100
    print(f"  [OK] Successfully saved. Size: {res_im.size}, Trans Pct: {trans_pct:.1f}%, Min Alpha: {ext[0]}")

print("\nBackground removal process complete!")
