import os
import subprocess
import time

def run(cmd):
    print(f">> {cmd}", flush=True)
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if p.stdout:
        print(p.stdout.strip(), flush=True)
    if p.stderr and p.returncode != 0:
        print(f"STDERR: {p.stderr.strip()}", flush=True)
    return p.returncode == 0

# Check git status for untracked files
p = subprocess.run("git status -s", shell=True, capture_output=True, text=True)
untracked = [line.strip().split(maxsplit=1)[1] for line in p.stdout.splitlines() if line.strip()]

print(f"Total untracked items/directories: {len(untracked)}", flush=True)

# Group by parent directories or push individual items
for idx, item in enumerate(untracked, 1):
    print(f"\n[{idx}/{len(untracked)}] Staging: {item}", flush=True)
    if not run(f'git add "{item}"'):
        continue
    
    # Check if anything is staged
    check = subprocess.run("git diff --cached --name-only", shell=True, capture_output=True, text=True)
    staged_files = check.stdout.strip().splitlines()
    if not staged_files:
        continue
    
    print(f"Staged {len(staged_files)} files. Committing...", flush=True)
    run(f'git commit -m "assets: add transparent catalog assets {idx} of {len(untracked)}"')
    
    pushed = False
    for attempt in range(3):
        print(f"Pushing (Attempt {attempt+1}/3)...", flush=True)
        if run("git push origin main"):
            pushed = True
            print("✓ Pushed successfully!", flush=True)
            break
        else:
            time.sleep(3)
    
    if not pushed:
        print(f"Failed to push item {item}, continuing...", flush=True)

print("\n" + "=" * 80, flush=True)
print("PUSH COMPLETE", flush=True)
print("=" * 80, flush=True)
run("git status")
