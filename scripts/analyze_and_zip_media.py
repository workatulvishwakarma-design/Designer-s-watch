import os
import re
import json
import zipfile
import shutil

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
EXPORT_DIR = os.path.join(ROOT_DIR, "exported_page_images")
ZIP_OUTPUT = os.path.join(ROOT_DIR, "home2_about5_images.zip")

VIDEO_EXTS = ('.mp4', '.webm', '.mov', '.ogg', '.m4v')

def extract_media_from_file(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    pattern = re.compile(r'[\'\"`]([^\'\"`\r\n]+\.(?:png|jpg|jpeg|webp|svg|gif|avif|mp4|webm|mov|ogg|m4v))(?:\?[^\'\"`\r\n]*)?[\'\"`]', re.IGNORECASE)
    matches = pattern.findall(content)
    
    results = []
    for m in matches:
        m = m.strip().replace('%20', ' ')
        if m.startswith('http://') or m.startswith('https://') or m.startswith('data:'):
            continue
        results.append(m)
    return results

def get_file_info(rel_path):
    clean = rel_path.lstrip('/')
    abs_path = os.path.join(PUBLIC_DIR, clean.replace('/', os.sep))
    if not os.path.exists(abs_path):
        return None
    
    size_bytes = os.path.getsize(abs_path)
    size_kb = size_bytes / 1024.0
    size_mb = size_kb / 1024.0
    
    is_image = any(clean.lower().endswith(ext) for ext in ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg'))
    is_video = any(clean.lower().endswith(ext) for ext in VIDEO_EXTS)
    
    return {
        "rel_path": rel_path,
        "clean_path": clean,
        "abs_path": abs_path,
        "size_bytes": size_bytes,
        "size_kb": round(size_kb, 2),
        "size_mb": round(size_mb, 2),
        "is_video": is_video,
        "is_image": is_image
    }

def main():
    print("Scanning Home-2 and About-5 media...")
    
    # 1. Home-2 Active Page Components
    home2_active_components = [
        "src/app/home-2/page.tsx",
        "src/components/HomeClient2.tsx",
        "src/components/sections/HeroBanner.tsx",
        "src/components/sections/home2/GenderSelector.tsx",
        "src/components/sections/home2/WatchGridCollage.tsx",
        "src/components/sections/home2/BrandClubs.tsx",
        "src/components/sections/WatchDetails.tsx",
        "src/components/sections/home2/SlideToSwitch.tsx",
        "src/components/sections/home2/StoreLocator.tsx",
    ]
    
    # Other Home-2 section files
    home2_all_components = list(home2_active_components)
    sections_dir = os.path.join(ROOT_DIR, "src", "components", "sections", "home2")
    if os.path.exists(sections_dir):
        for f in sorted(os.listdir(sections_dir)):
            rel = f"src/components/sections/home2/{f}"
            if rel not in home2_all_components:
                home2_all_components.append(rel)

    # 2. About-5 files
    about5_files = [
        "src/app/about-5/page.tsx",
        "src/app/about-5/about5.module.css",
    ]

    home2_active_media = {}
    for comp in home2_active_components:
        full_p = os.path.join(ROOT_DIR, comp)
        for m in extract_media_from_file(full_p):
            info = get_file_info(m)
            if info:
                if m not in home2_active_media:
                    home2_active_media[m] = {**info, "used_in": []}
                if comp not in home2_active_media[m]["used_in"]:
                    home2_active_media[m]["used_in"].append(comp)

    home2_all_media = {}
    for comp in home2_all_components:
        full_p = os.path.join(ROOT_DIR, comp)
        for m in extract_media_from_file(full_p):
            info = get_file_info(m)
            if info:
                if m not in home2_all_media:
                    home2_all_media[m] = {**info, "used_in": []}
                if comp not in home2_all_media[m]["used_in"]:
                    home2_all_media[m]["used_in"].append(comp)

    about5_media = {}
    for comp in about5_files:
        full_p = os.path.join(ROOT_DIR, comp)
        for m in extract_media_from_file(full_p):
            info = get_file_info(m)
            if info:
                if m not in about5_media:
                    about5_media[m] = {**info, "used_in": []}
                if comp not in about5_media[m]["used_in"]:
                    about5_media[m]["used_in"].append(comp)

    # Clean and recreate export directory
    if os.path.exists(EXPORT_DIR):
        shutil.rmtree(EXPORT_DIR)
    os.makedirs(EXPORT_DIR, exist_ok=True)

    home2_export_dir = os.path.join(EXPORT_DIR, "home-2")
    home2_extra_dir = os.path.join(EXPORT_DIR, "home-2-all-sections")
    about5_export_dir = os.path.join(EXPORT_DIR, "about-5")

    os.makedirs(home2_export_dir, exist_ok=True)
    os.makedirs(home2_extra_dir, exist_ok=True)
    os.makedirs(about5_export_dir, exist_ok=True)

    # Copy Active Home-2 Images
    h2_active_imgs = [v for v in home2_active_media.values() if v['is_image']]
    for img in h2_active_imgs:
        src = img['abs_path']
        fname = os.path.basename(src)
        dst = os.path.join(home2_export_dir, fname)
        if os.path.exists(dst):
            parent = os.path.basename(os.path.dirname(src))
            dst = os.path.join(home2_export_dir, f"{parent}_{fname}")
        shutil.copy2(src, dst)
        img["exported_name"] = os.path.basename(dst)

    # Copy Home-2 All Sections Images
    h2_all_imgs = [v for v in home2_all_media.values() if v['is_image']]
    for img in h2_all_imgs:
        src = img['abs_path']
        fname = os.path.basename(src)
        dst = os.path.join(home2_extra_dir, fname)
        if os.path.exists(dst):
            parent = os.path.basename(os.path.dirname(src))
            dst = os.path.join(home2_extra_dir, f"{parent}_{fname}")
        shutil.copy2(src, dst)
        img["exported_name"] = os.path.basename(dst)

    # Copy About-5 Images
    a5_imgs = [v for v in about5_media.values() if v['is_image']]
    for img in a5_imgs:
        src = img['abs_path']
        fname = os.path.basename(src)
        dst = os.path.join(about5_export_dir, fname)
        if os.path.exists(dst):
            parent = os.path.basename(os.path.dirname(src))
            dst = os.path.join(about5_export_dir, f"{parent}_{fname}")
        shutil.copy2(src, dst)
        img["exported_name"] = os.path.basename(dst)

    # Create ZIP
    if os.path.exists(ZIP_OUTPUT):
        os.remove(ZIP_OUTPUT)

    with zipfile.ZipFile(ZIP_OUTPUT, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(EXPORT_DIR):
            for file in sorted(files):
                abs_f = os.path.join(root, file)
                rel_z = os.path.relpath(abs_f, EXPORT_DIR)
                zf.write(abs_f, rel_z)

    zip_size_mb = os.path.getsize(ZIP_OUTPUT) / (1024.0 * 1024.0)

    # Output JSON summary
    summary_data = {
        "zip_path": ZIP_OUTPUT,
        "zip_size_mb": round(zip_size_mb, 2),
        "home2_active_images": h2_active_imgs,
        "home2_active_videos": [v for v in home2_active_media.values() if v['is_video']],
        "home2_all_images": h2_all_imgs,
        "home2_all_videos": [v for v in home2_all_media.values() if v['is_video']],
        "about5_images": a5_imgs,
        "about5_videos": [v for v in about5_media.values() if v['is_video']]
    }
    with open(os.path.join(ROOT_DIR, "media_summary.json"), "w", encoding="utf-8") as f:
        json.dump(summary_data, f, indent=2)

    print("=== SUMMARY RESULT ===")
    print(f"Zip created: {ZIP_OUTPUT} ({round(zip_size_mb, 2)} MB)")
    print(f"Export directory: {EXPORT_DIR}")
    print(f"Home-2 Active Images: {len(h2_active_imgs)} files")
    print(f"Home-2 Active Videos: {len(summary_data['home2_active_videos'])} files")
    print(f"Home-2 All Section Images: {len(h2_all_imgs)} files")
    print(f"About-5 Images: {len(a5_imgs)} files")
    print(f"About-5 Videos: {len(summary_data['about5_videos'])} files")

if __name__ == "__main__":
    main()
