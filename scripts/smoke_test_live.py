import urllib.request
import json
import time

LIVE_HOST = "http://187.127.140.26:3000"

pages_to_test = [
    ("/", "Root Landing Page"),
    ("/home-2", "Home 2 Page"),
    ("/about-5", "About Heritage Page"),
    ("/pillar-4", "Core Divisions / Pillars Page"),
    ("/contact", "Contact Page"),
    ("/collections/dsigner-men", "D'SIGNER Men Collection"),
    ("/collections/dsigner-womens", "D'SIGNER Women Collection"),
    ("/collections/Escort-men", "Escort Men Collection"),
    ("/collections/Escort-womens", "Escort Women Collection"),
    ("/login", "Login Page"),
    ("/cart", "Cart Page"),
]

print("=" * 80)
print(f"TESTING LIVE SERVER: {LIVE_HOST}")
print("=" * 80)

server_online = False
for path, desc in pages_to_test:
    url = f"{LIVE_HOST}{path}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'SmokeTestBot/1.0'})
        start = time.time()
        with urllib.request.urlopen(req, timeout=10) as resp:
            elapsed = time.time() - start
            body = resp.read()
            print(f"[HTTP {resp.status} OK] {path:<30} ({elapsed:.2f}s, {len(body)} bytes) - {desc}")
            server_online = True
    except Exception as e:
        print(f"[FAIL] {path:<30} -> {e}")

print("=" * 80)
print(f"LIVE SERVER REACHABLE: {server_online}")
print("=" * 80)
