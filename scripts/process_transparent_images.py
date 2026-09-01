#!/usr/bin/env python3
"""
Process Product Image Backgrounds to True Transparency
-------------------------------------------------------
- Scans product images for /collections/dsigner-men, /collections/dsigner-womens,
  /collections/Escort-men, and /collections/Escort-womens.
- Extracts background with rembg (u2net) to preserve fine watch details, metallic surfaces,
  and light/white dials.
- Saves transparent PNGs to public/images/transparent-img/ (never touching originals).
- Generates transparent image mapping and audit report.
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path
from PIL import Image
import numpy as np
import rembg
import concurrent.futures

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = PROJECT_ROOT / "public"
ORIG_BASE = PUBLIC_DIR / "images" / "new-img"
TRANSPARENT_BASE = PUBLIC_DIR / "images" / "transparent-img"
MAP_OUTPUT_FILE = PROJECT_ROOT / "src" / "data" / "transparent_image_map.json"

_worker_session = None

def init_worker():
    global _worker_session
    _worker_session = rembg.new_session("u2net")

def get_transparent_rel_path(orig_rel_path: str) -> str:
    clean_path = orig_rel_path.strip().replace("\\", "/")
    if clean_path.startswith("/images/new-img/"):
        sub = clean_path[len("/images/new-img/"):]
    elif clean_path.startswith("images/new-img/"):
        sub = clean_path[len("images/new-img/"):]
    else:
        sub = clean_path.lstrip("/")
    
    stem, _ = os.path.splitext(sub)
    new_sub = f"{stem}.png"
    return f"/images/transparent-img/{new_sub}"

def is_already_transparent(img: Image.Image) -> bool:
    if img.mode != "RGBA":
        return False
    alpha = np.array(img.split()[-1])
    transparent_ratio = np.mean(alpha < 10)
    return transparent_ratio > 0.02

def validate_transparent_image(out_img: Image.Image, orig_img: Image.Image) -> tuple[bool, str]:
    if out_img.mode != "RGBA":
        return False, f"Invalid mode: {out_img.mode} (expected RGBA)"
    
    if out_img.size != orig_img.size:
        return False, f"Size mismatch: {out_img.size} vs original {orig_img.size}"
    
    alpha = np.array(out_img.split()[-1])
    transparent_pixels = np.sum(alpha < 10)
    solid_pixels = np.sum(alpha > 200)
    total_pixels = alpha.size
    
    transparent_ratio = transparent_pixels / total_pixels
    solid_ratio = solid_pixels / total_pixels
    
    if transparent_ratio < 0.03:
        return False, f"Insufficient background transparency: {transparent_ratio:.1%}"
    
    if solid_ratio < 0.08:
        return False, f"Watch eroded/missing: solid foreground is only {solid_ratio:.1%}"
    
    if solid_ratio > 0.96:
        return False, f"Background not removed: solid ratio {solid_ratio:.1%}"
    
    return True, "Valid RGBA transparent image"

def worker_process_image(item_tuple: tuple[dict, bool]) -> dict:
    global _worker_session
    item, force = item_tuple
    orig_rel = item["orig_rel_path"]
    trans_rel = get_transparent_rel_path(orig_rel)
    
    orig_file = PUBLIC_DIR / orig_rel.lstrip("/")
    trans_file = PUBLIC_DIR / trans_rel.lstrip("/")
    
    res = {
        "orig_rel_path": orig_rel,
        "trans_rel_path": trans_rel,
        "status": "pending",
        "message": "",
        "orig_size": None,
        "time_taken": 0
    }
    
    if not orig_file.exists():
        res["status"] = "missing"
        res["message"] = f"Original file not found: {orig_file}"
        return res
    
    if trans_file.exists() and not force:
        try:
            with Image.open(trans_file) as existing_out:
                with Image.open(orig_file) as orig_img:
                    is_valid, msg = validate_transparent_image(existing_out, orig_img)
                    if is_valid:
                        res["status"] = "cached"
                        res["message"] = "Valid transparent output already exists"
                        res["orig_size"] = orig_img.size
                        return res
        except Exception:
            pass
    
    t0 = time.time()
    try:
        with Image.open(orig_file) as orig_img:
            res["orig_size"] = orig_img.size
            
            if is_already_transparent(orig_img):
                trans_file.parent.mkdir(parents=True, exist_ok=True)
                orig_img.save(trans_file, "PNG")
                res["status"] = "already_transparent"
                res["message"] = "Original already had alpha transparency"
                res["time_taken"] = round(time.time() - t0, 3)
                return res
            
            input_rgb = orig_img.convert("RGB")
            out_rgba = rembg.remove(
                input_rgb,
                session=_worker_session,
                alpha_matting=False,
                post_process_mask=True
            )
            
            is_valid, val_msg = validate_transparent_image(out_rgba, orig_img)
            if not is_valid:
                res["status"] = "invalid_output"
                res["message"] = f"Validation failed: {val_msg}"
                return res
            
            trans_file.parent.mkdir(parents=True, exist_ok=True)
            out_rgba.save(trans_file, "PNG", optimize=True)
            
            res["status"] = "success"
            res["message"] = val_msg
            res["time_taken"] = round(time.time() - t0, 3)
            return res
            
    except Exception as e:
        res["status"] = "failed"
        res["message"] = str(e)
        return res

def collect_target_images() -> tuple[list[dict], dict]:
    dsigner_path = PROJECT_ROOT / "src" / "data" / "dsigner_master_inventory.json"
    escort_path = PROJECT_ROOT / "src" / "data" / "escort_master_inventory.json"
    
    with open(dsigner_path, "r", encoding="utf-8") as f:
        dsigner_data = json.load(f)
    with open(escort_path, "r", encoding="utf-8") as f:
        escort_data = json.load(f)
    
    all_items = (
        dsigner_data.get("men", []) +
        dsigner_data.get("women", []) +
        escort_data.get("men", []) +
        escort_data.get("women", [])
    )
    
    image_usage = {}
    for item in all_items:
        prod_id = item.get("modelNo", "")
        dial = item.get("dialColor", "")
        strap = item.get("strapColor", "")
        gender = item.get("gender", "")
        series = item.get("series", "")
        
        imgs = []
        if item.get("primaryImage"): imgs.append(("primary", item["primaryImage"]))
        if item.get("hoverImage"): imgs.append(("hover", item["hoverImage"]))
        for g in item.get("gallery", []):
            if g: imgs.append(("gallery", g))
        
        for kind, img_path in imgs:
            if not img_path: continue
            clean = img_path.strip().replace("\\", "/")
            if clean not in image_usage:
                image_usage[clean] = {
                    "orig_rel_path": clean,
                    "products": [],
                    "dial": dial,
                    "strap": strap,
                    "gender": gender,
                    "series": series,
                    "is_primary_or_hover": False
                }
            image_usage[clean]["products"].append(prod_id)
            if kind in ("primary", "hover"):
                image_usage[clean]["is_primary_or_hover"] = True
    
    image_list = list(image_usage.values())
    # Prioritize all primary and hover images for immediate collection card availability
    image_list.sort(key=lambda x: (not x["is_primary_or_hover"], x["orig_rel_path"]))
    return image_list, image_usage

def main():
    parser = argparse.ArgumentParser(description="Process product images to transparent PNGs.")
    parser.add_argument("--sample-only", action="store_true", help="Run test sample only")
    parser.add_argument("--primary-hover-only", action="store_true", help="Process only primary and hover images")
    parser.add_argument("--force", action="store_true", help="Force re-processing even if cached")
    parser.add_argument("--workers", type=int, default=4, help="Number of worker processes (default: 4)")
    args = parser.parse_args()
    
    print(f"Collecting target images from collection inventories...", flush=True)
    image_list, image_usage = collect_target_images()
    print(f"Found {len(image_list)} unique images across all 4 collection pages.", flush=True)
    
    # Identify diverse sample items for validation
    sample_categories = [
        ("Gold", "Gold"),
        ("Silver", "Silver"),
        ("Rose Gold", "Rose Gold"),
        ("Black", "Black"),
        ("Green", "Brown"),
        ("Blue", "Blue"),
        ("White", "Silver"),
        ("Grey", "Steel"),
    ]
    
    sample_items = []
    picked_paths = set()
    for dial_target, strap_target in sample_categories:
        for item in image_list:
            if item["orig_rel_path"] in picked_paths: continue
            if (dial_target.lower() in item["dial"].lower() or 
                strap_target.lower() in item["strap"].lower()) and item["is_primary_or_hover"]:
                sample_items.append(item)
                picked_paths.add(item["orig_rel_path"])
                break
    
    if len(sample_items) < 8:
        for item in image_list:
            if item["orig_rel_path"] not in picked_paths and item["is_primary_or_hover"]:
                sample_items.append(item)
                picked_paths.add(item["orig_rel_path"])
                if len(sample_items) >= 8: break
    
    # Step 1: Run Sample Validation
    print("=" * 60, flush=True)
    print("RUNNING TEST SAMPLE VALIDATION (DIVERSE WATCH TYPES)", flush=True)
    print("=" * 60, flush=True)
    
    # Test sample with 1 worker to ensure clean logs
    init_worker()
    sample_results = []
    for idx, item in enumerate(sample_items, 1):
        print(f"[{idx}/{len(sample_items)}] Processing sample: {item['orig_rel_path']} ({item['dial']} dial, {item['strap']} strap, {item['series']})...", flush=True)
        res = worker_process_image((item, True))
        print(f"   -> Status: {res['status']} | {res['message']} ({res['time_taken']}s)", flush=True)
        sample_results.append(res)
    
    sample_success = sum(1 for r in sample_results if r["status"] in ("success", "already_transparent", "cached"))
    print(f"\nSample results: {sample_success}/{len(sample_items)} valid transparent outputs.", flush=True)
    
    if sample_success < len(sample_items):
        print("\nERROR: Sample test batch had failures!", flush=True)
        if args.sample_only:
            sys.exit(1)
    
    if args.sample_only:
        print("\nSample test complete.", flush=True)
        return
    
    # Step 2: Full Batch Processing with Multi-processing
    print("\n" + "=" * 60, flush=True)
    print(f"STARTING FULL BATCH TRANSPARENT ASSET GENERATION ({args.workers} WORKERS)", flush=True)
    print("=" * 60, flush=True)
    
    target_queue = image_list
    if args.primary_hover_only:
        target_queue = [item for item in image_list if item["is_primary_or_hover"]]
        print(f"Filtering to primary & hover images only: {len(target_queue)} images", flush=True)
    
    stats = {
        "TOTAL_SOURCE_IMAGES": len(image_list),
        "TOTAL_TARGET_QUEUE": len(target_queue),
        "PROCESSED_SUCCESSFULLY": 0,
        "ALREADY_TRANSPARENT": 0,
        "CACHED": 0,
        "FAILED": 0,
        "MISSING": 0,
        "INVALID_OUTPUT": 0,
    }
    
    mapping = {}
    # Pre-load existing mapping if available
    if MAP_OUTPUT_FILE.exists():
        try:
            with open(MAP_OUTPUT_FILE, "r", encoding="utf-8") as f:
                mapping = json.load(f)
        except Exception:
            mapping = {}
    
    failed_report = []
    task_args = [(item, args.force) for item in target_queue]
    
    t_start = time.time()
    completed_count = 0
    
    with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers, initializer=init_worker) as executor:
        for res in executor.map(worker_process_image, task_args):
            completed_count += 1
            orig_rel = res["orig_rel_path"]
            status = res["status"]
            
            if status == "success":
                stats["PROCESSED_SUCCESSFULLY"] += 1
                mapping[orig_rel] = res["trans_rel_path"]
            elif status == "already_transparent":
                stats["ALREADY_TRANSPARENT"] += 1
                mapping[orig_rel] = res["trans_rel_path"]
            elif status == "cached":
                stats["CACHED"] += 1
                mapping[orig_rel] = res["trans_rel_path"]
            elif status == "missing":
                stats["MISSING"] += 1
                failed_report.append(res)
            elif status == "invalid_output":
                stats["INVALID_OUTPUT"] += 1
                failed_report.append(res)
            else:
                stats["FAILED"] += 1
                failed_report.append(res)
            
            if completed_count % 25 == 0 or completed_count == len(target_queue):
                elapsed = time.time() - t_start
                rate = completed_count / elapsed if elapsed > 0 else 0
                remaining = len(target_queue) - completed_count
                eta_mins = (remaining / rate / 60) if rate > 0 else 0
                print(f"[{completed_count}/{len(target_queue)}] ({rate:.1f} img/s, ETA: {eta_mins:.1f}m) - Success: {stats['PROCESSED_SUCCESSFULLY'] + stats['CACHED'] + stats['ALREADY_TRANSPARENT']}, Fail: {stats['FAILED'] + stats['INVALID_OUTPUT'] + stats['MISSING']}", flush=True)
                
                # Incremental map save every 50 images
                if completed_count % 50 == 0:
                    MAP_OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
                    with open(MAP_OUTPUT_FILE, "w", encoding="utf-8") as f:
                        json.dump(mapping, f, indent=2)
    
    total_time = round(time.time() - t_start, 2)
    
    # Save Transparent Mapping JSON
    MAP_OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(MAP_OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2)
    print(f"\nSaved transparent image mapping to {MAP_OUTPUT_FILE} ({len(mapping)} mapped entries).", flush=True)
    
    # Print Full Audit Report
    print("\n" + "=" * 60, flush=True)
    print("FINAL TRANSPARENT PROCESSING AUDIT REPORT", flush=True)
    print("=" * 60, flush=True)
    print(f"TOTAL SOURCE IMAGES SCANNED:    {stats['TOTAL_SOURCE_IMAGES']}", flush=True)
    print(f"TOTAL IMAGES IN WORK QUEUE:     {stats['TOTAL_TARGET_QUEUE']}", flush=True)
    print(f"PROCESSED SUCCESSFULLY (NEW):   {stats['PROCESSED_SUCCESSFULLY']}", flush=True)
    print(f"CACHED / PREVIOUSLY GENERATED:  {stats['CACHED']}", flush=True)
    print(f"ALREADY HAD ALPHA TRANSPARENCY: {stats['ALREADY_TRANSPARENT']}", flush=True)
    print(f"INVALID OUTPUT / DAMAGED MASK:  {stats['INVALID_OUTPUT']}", flush=True)
    print(f"FAILED / EXCEPTIONS:            {stats['FAILED']}", flush=True)
    print(f"MISSING SOURCE FILES:           {stats['MISSING']}", flush=True)
    print(f"TOTAL VALID TRANSPARENT ASSETS: {len(mapping)}", flush=True)
    print(f"TOTAL ELAPSED TIME:             {total_time}s", flush=True)
    print("=" * 60, flush=True)
    
    if failed_report:
        print("\nFailed images summary:", flush=True)
        for item in failed_report[:10]:
            print(f"  - {item['orig_rel_path']}: {item['message']}", flush=True)

if __name__ == "__main__":
    main()
