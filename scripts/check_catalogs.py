import glob
import os
import re
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

print("\n" + "="*80)
print(f"{'KATALOG SAYFASI':<30} | {'SATIR':<7} | {'MADDE SAYISI':<12} | {'DURUM'}")
print("="*80)

seen = set()
for f in sorted(glob.glob('src/presentation/pages/*catalog*.tsx') + ['src/presentation/pages/catalog.tsx']):
    f = os.path.normpath(f)
    if f in seen:
        continue
    seen.add(f)
    
    content = open(f, encoding='utf-8').read()
    lines = len(content.splitlines())
    items = len(re.findall(r'id:\s*[\'\"]', content))
    
    status = "ZENGIN (Kapsamli)" if items >= 8 else "KISA (Genisletilebilir)"
    print(f"{os.path.basename(f):<30} | {lines:<7} | {items:<12} | {status}")

print("="*80 + "\n")
