import os
import re
import json

LINK_REGEX = re.compile(r'href=[\'"`]((?!http|mailto|tel|#)[^\'"`]+)[\'"`]')

all_links = {}

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
            filepath = os.path.join(root, file).replace('\\', '/')
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                matches = LINK_REGEX.findall(content)
                for m in matches:
                    if m not in all_links:
                        all_links[m] = []
                    all_links[m].append(filepath)

print("=" * 80)
print(f"TOTAL UNIQUE INTERNAL HREF DESTINATIONS: {len(all_links)}")
print("=" * 80)

for href, files in sorted(all_links.items()):
    print(f"\nHREF: {href}")
    print(f"  Used in {len(files)} files:")
    for f in files[:5]:
        print(f"    - {f}")
    if len(files) > 5:
        print(f"    ... and {len(files) - 5} more files")
