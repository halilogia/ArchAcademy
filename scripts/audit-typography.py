import os
import re

# Configuration
SEARCH_DIR = './src'
EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'themes'] # Skip themes to avoid flagging typography.ts itself
PATTERN = r'fontSize:\s*[\'"]([^\'"]+)[\'"]|fontSize:\s*(\d+)'

def audit_typography():
    violations = []
    
    print("🔍 Typography Audit başlatılıyor...")
    print("Mandate: THE THEME-FIRST MANDATE (ZORUNLU)\n")

    for root, dirs, files in os.walk(SEARCH_DIR):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    for i, line in enumerate(lines):
                        match = re.search(PATTERN, line)
                        if match:
                            detected_value = match.group(1) or match.group(2)
                            # Simple heuristic: If it doesn't contain 'typography' or 'var', it's likely hardcoded
                            # In our project, tokens are used via typography.size.X or typography.presets.X.fontSize
                            if 'typography' not in line and 'var(' not in line:
                                violations.append({
                                    'file': file_path,
                                    'line': i + 1,
                                    'content': line.strip(),
                                    'value': detected_value
                                })

    if violations:
        print(f"❌ {len(violations)} Adet Tipografi İhlali Tespit Edildi!\n")
        print(f"{'Dosya':<60} | {'Satır':<6} | {'Hatalı Değer'}")
        print("-" * 100)
        for v in violations:
            print(f"{v['file']:<60} | {v['line']:<6} | {v['value']}")
        
        print("\n🚀 Çözüm: Bu değerleri src/presentation/themes/typography.ts içindeki tokenlar ile değiştirin.")
    else:
        print("✅ Elite Quality Standard met. Tüm puntolar merkezi sistemden geliyor!")

if __name__ == "__main__":
    audit_typography()
