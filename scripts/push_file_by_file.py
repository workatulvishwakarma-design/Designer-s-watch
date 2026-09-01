import os
import subprocess
import time
import sys

def run(cmd):
    print(f">> {cmd}", flush=True)
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if p.stdout:
        print(p.stdout.strip(), flush=True)
    if p.stderr and p.returncode != 0:
        print(f"STDERR: {p.stderr.strip()}", flush=True)
    return p.returncode == 0

# Find all untracked PNG/image files
p = subprocess.run("git status -s", shell=True, capture_output=True, text=True)
files_to_push = []
for line in p.stdout.splitlines():
    line = line.strip()
    if line.startswith("??"):
        item = line[3:].strip()
        if os.path.isfile(item):
            files_to_push.append(item)
        elif os.path.isdir(item):
            for root, dirs, files in os.walk(item):
                for f in files:
                    files_to_push.append(os.path.join(root, f).replace("\\", "/"))

print(f"Total individual files remaining to push: {len(files_to_push)}", flush=True)

# Group into batches of 8 files (~15-20MB total)
batch_size = 8
batches = [files_to_push[i:i + batch_size] for i in range(0, len(files_to_push), batch_size)]
print(f"Total batches to process: {len(batches)}", flush=True)

for idx, batch in enumerate(batches, 1):
    print(f"\n--- [{idx}/{len(batches)}] Processing Batch ---", flush=True)
    for f in batch:
        sz_mb = os.path.getsize(f) / (1024*1024) if os.path.exists(f) else 0
        print(f"  + {f} ({sz_mb:.2f} MB)", flush=True)
        run(f'git add "{f}"')
    
    # Check if staged
    check = subprocess.run("git diff --cached --name-only", shell=True, capture_output=True, text=True)
    if not check.stdout.strip():
        print("Nothing staged, skipping.", flush=True)
        continue
    
    run(f'git commit -m "assets: transparent image batch {idx}/{len(batches)}"')
    
    pushed = False
    for attempt in range(4):
        print(f"Pushing batch {idx} (Attempt {attempt+1}/4)...", flush=True)
        if run("git push origin main"):
            pushed = True
            print(f"[SUCCESS] Batch {idx} pushed to origin/main!", flush=True)
            break
        else:
            print("Retrying in 5s...", flush=True)
            time.sleep(5)
    
    if not pushed:
        print(f"[ERROR] Batch {idx} push failed after all attempts.", flush=True)

print("\n" + "=" * 80, flush=True)
print("ALL BATCHES PUSHED SUCCESSFULLY", flush=True)
print("=" * 80, flush=True)
