import os
import subprocess
import time

def run_cmd(cmd):
    print(f"--> {cmd}", flush=True)
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.stdout:
        print(res.stdout.strip(), flush=True)
    if res.stderr and res.returncode != 0:
        print(f"ERR: {res.stderr.strip()}", flush=True)
    return res.returncode == 0

# Get subdirectories in public/images/transparent-img and transparent
targets = []

t_img = "public/images/transparent-img"
if os.path.exists(t_img):
    for sub in sorted(os.listdir(t_img)):
        sub_path = os.path.join(t_img, sub)
        if os.path.isdir(sub_path):
            # If sub is model-1 or escort, go one level deeper
            sub_items = sorted(os.listdir(sub_path))
            for item in sub_items:
                item_path = os.path.join(sub_path, item)
                if os.path.isdir(item_path):
                    targets.append(item_path.replace("\\", "/"))
                else:
                    targets.append(item_path.replace("\\", "/"))
        else:
            targets.append(sub_path.replace("\\", "/"))

t_old = "public/images/transparent"
if os.path.exists(t_old):
    targets.append(t_old.replace("\\", "/"))

print(f"Total batches to push: {len(targets)}", flush=True)

# Group targets into chunks of ~5 folders each
chunk_size = 5
chunks = [targets[i:i + chunk_size] for i in range(0, len(targets), chunk_size)]

for idx, chunk in enumerate(chunks, 1):
    print(f"\n[{idx}/{len(chunks)}] Staging batch: {chunk}", flush=True)
    paths_str = " ".join([f'"{p}"' for p in chunk])
    if not run_cmd(f"git add {paths_str}"):
        print("Git add failed, retrying once...", flush=True)
        time.sleep(2)
        run_cmd(f"git add {paths_str}")

    # Check if anything is staged
    res = subprocess.run("git diff --cached --name-only", shell=True, capture_output=True, text=True)
    if not res.stdout.strip():
        print("Nothing staged in this batch, skipping commit/push.", flush=True)
        continue

    commit_msg = f"assets: transparent images batch {idx} of {len(chunks)}"
    run_cmd(f'git commit -m "{commit_msg}"')

    # Push with retry
    pushed = False
    for attempt in range(3):
        print(f"Pushing batch {idx} (Attempt {attempt+1}/3)...", flush=True)
        if run_cmd("git push origin main"):
            pushed = True
            print(f"✓ Batch {idx} pushed successfully!", flush=True)
            break
        else:
            print(f"Push attempt {attempt+1} failed, waiting 5s...", flush=True)
            time.sleep(5)

    if not pushed:
        print(f"WARNING: Batch {idx} could not be pushed after 3 attempts.", flush=True)

print("\n" + "=" * 80, flush=True)
print("FINAL REPOSITORY STATUS CHECK", flush=True)
print("=" * 80, flush=True)
run_cmd("git status")
run_cmd("git log -n 5 --oneline")
