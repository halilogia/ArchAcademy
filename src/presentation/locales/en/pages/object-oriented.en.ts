The user wants me to translate Turkish text in a TypeScript/React file into English. The file is `object-oriented.tsx` and contains Turkish content within a React component. I need to translate the Turkish strings while preserving all code structure, JSX, TypeScript types, variables, imports, etc.

Let me identify all the Turkish text in the file:

1. Pillars array descriptions:
   - "Veriyi ve o veriyi işleyen metodları tek bir "kapsül" içine hapsedin. Dış dünya sadece izin verdiğiniz arayüzden (Interface) içeri bakabilsin."
   - "Gereksiz detayları gizleyip sadece objenin "ne yapabildiğine" odaklanın. Motorun içindeki dişlileri değil, kontağın nasıl çalıştığını gösterin."
   - "Mevcut bir objenin özelliklerini miras (Inheritance) alarak yeni yapılar kurun. Kod tekrarını öldürün, hiyerarşiyi canlandırın."
   - "Farklı objelerin aynı mesaja (Method Call) kendilerine has cevaplar vermesini sağlayın. Tek bir kumanda ile tüm cihazları yönetin."

2. ArchHero props:
   - description: "Kaosu nesnelerle evcilleştirin. OOP, sadece kod yazma biçimi değil; karmaşık sistemleri birbiriyle mesajlaşan, bağımsız atomik birimler (Objects) olarak görme felsefesidir."
   - badge: "Modular Mastery" (this is already English)
   - features:
     - "Veri ve mantığı birbirinden asla ayırmayın."
     - "Objeler birbirlerine sadece metodlarla dokunabilir."
     - "Sürdürülebilir büyüme için sarsılmaz kurallar."

3. "The 4 Pillars Section" heading:
   - "OOP'nin 4 Temel Direği"
   - "Daha sağlam yapılar kurmak için bu temel yasaları takip edin."

4. "Code vs Real-World Section":
   - "Gerçek Dünyayı Kodlamak"
   - "OOP'nin asıl gücü, soyut algoritmalar yerine gerçek dünya problemlerini nesneleştirmektir. Bir "Banka Hesabı" sadece bir sayı değil; limitleri olan, transfer yeteneği bulunan ve güvenliği kendi içinde sağlayan yaşayan bir varlıktır."
   - "Hataları tek bir objeye hapsedin."
   - "Tekerleği her seferinde yeniden icat etmeyin."

5. SOLID Footer:
   - "Ekmek ve Tuz: SOLID Prensipleri"
   - "OOP mimarisinin ayakta kalmasını sağlayan şey sınıflar değil, sınıflar arası disiplindir. SOLID prensipleri, bu disiplinin anayasasıdır."

6. Engineering DNA section:
   - "Nesne yönelimli programlama felsefesi, kalıtım hiyerarşileri ve SOLID prensiplerinin mimari tasarımdaki yeri hakkında temel dokümanları inceleyin."

Also the comment `{/* The 4 Pillars Section */}` and `{/* Code vs Real-World Section */}` are already English.

Now the instructions are interesting. On one hand:
- Translate to "flawless, idiomatic American English" (software architecture translation task)
- Preserve technical terms like "Bounded Context", "Aggregate Root", "Domain-Driven Design", "Single Responsibility", etc. — many of these appear in the source text already as parenthetical English terms (Inheritance, Method Call, Objects).

On the other hand:
- "Respond like terse caveman" — but this is for the meta-response, not necessarily for the code translation itself? Wait — the system prompt combines two things: a role as "Principal Software Architect and elite Technical Localization Engine" with strict rules (preserve technical terms, output only clean valid TypeScript, authoritative tone), and then a "caveman" style instruction.

Hmm. There's a tension. The caveman instruction says: "All technical substance stay exact, only fluff die." For a translation task, the technical substance is the code and the technical meanings. But the user explicitly asked: "Translate the following software architecture component content into English." The expected output should be the translated file content.

The caveman style should apply to any explanatory text I add around the code. But "OUTPUT FORMAT: Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested." — meaning I should output the translated file as code, presumably fenced or not? Rule says NO markdown backtick wrapping unless requested. So I should output raw TypeScript without backticks. But then the caveman style applies to nothing? The file itself is code — I can't make JSX terse.

Actually, I think the correct interpretation: The user instruction (translate the file) plus the output format rule (output only clean valid TypeScript, no markdown wrapping) means my answer should be the translated file content, pure code. The "caveman" instruction governs prose responses. Since the response is pure code translation, I just output the code. No commentary needed.

Let me make sure translations are good, idiomatic American English software-engineering tone, preserving technical terms.

Let me translate each Turkish chunk:

1. Encapsulation desc:
"Veriyi ve o veriyi işleyen metodları tek bir "kapsül" içine hapsedin. Dış dünya sadece izin verdiğiniz arayüzden (Interface) içeri bakabilsin."
→ "Seal the data and the methods that operate on it inside a single "capsule". The outside world can only peer in through the interface (Interface) you grant access to."

Hmm, but the parenthetical (Interface) is a technical term in English already — in Turkish text they write "arayüzden (Interface)". Since we're translating to English, "interface" alone suffices, but keeping the parenthetical is redundant. Better: "Confine the data and the methods that process it inside a single "capsule". The outside world can only see inside through the interface you expose."

2. Abstraction:
"Gereksiz detayları gizleyip sadece objenin "ne yapabildiğine" odaklanın. Motorun içindeki dişlileri değil, kontağın nasıl çalıştığını gösterin."
→ "Hide unnecessary details and focus only on what the object "can do." Show how the ignition works, not the gears inside the engine."

3. Inheritance:
"Mevcut bir objenin özelliklerini miras (Inheritance) alarak yeni yapılar kurun. Kod tekrarını öldürün, hiyerarşiyi canlandırın."
→ "Build new structures by inheriting (Inheritance) properties from an existing object. Kill code duplication, breathe life into the hierarchy."

4. Polymorphism:
"Farklı objelerin aynı mesaja (Method Call) kendilerine has cevaplar vermesini sağlayın. Tek bir kumanda ile tüm cihazları yönetin."
→ "Let different objects respond to the same message (Method Call) in their own way. Control every device with a single remote."

5. Hero description:
"Kaosu nesnelerle evcilleştirin. OOP, sadece kod yazma biçimi değil; karmaşık sistemleri birbiriyle mesajlaşan, bağımsız atomik birimler (Objects) olarak görme felsefesidir."
→ "Tame chaos with objects. OOP is not merely a way of writing code; it is a philosophy of viewing complex systems as independent atomic units (Objects) that communicate with one another."

Wait — the caveman style... but this is code content, the product of translation. The strict rule states OUTPUT FORMAT: output only clean valid TypeScript as requested. The translation should be idiomatic, authoritative, crystal clear. I'll go with polished senior-level English for the UI copy.

6. Feature descriptions:
- "Veri ve mantığı birbirinden asla ayırmayın." → "Never separate data and logic."
- "Objeler birbirlerine sadece metodlarla dokunabilir." → "Objects can only touch each other through methods."
- "Sürdürülebilir büyüme için sarsılmaz kurallar." → "Unshakable rules for sustainable growth."

7. Section heading:
"OOP'nin 4 Temel Direği" → "The 4 Core Pillars of OOP"
Sub: "Daha sağlam yapılar kurmak için bu temel yasaları takip edin." → "Follow these fundamental laws to build more resilient structures."

8. "Gerçek Dünyayı Kodlamak" → "Coding the Real World"
Paragraph: "OOP'nin asıl gücü, soyut algoritmalar yerine gerçek dünya problemlerini nesneleştirmektir. Bir "Banka Hesabı" sadece bir sayı değil; limitleri olan, transfer yeteneği bulunan ve güvenliği kendi içinde sağlayan yaşayan bir varlıktır."
→ "OOP's real power lies in objectifying real-world problems rather than abstract algorithms. A "Bank Account" is not just a number; it is a living entity with limits, transfer capabilities, and built-in security."

9. "Hataları tek bir objeye hapsedin." → "Contain errors within a single object."
10. "Tekerleği her seferinde yeniden icat etmeyin." → "Don't reinvent the wheel every time."

11. "Ekmek ve Tuz: SOLID Prensipleri" — "Ekmek ve Tuz" is a Turkish idiom roughly meaning "bread and salt" = staple, foundation, earnest commitment. Hmm. It's an idiom: "ekmek ve tuz" signifies a bond/commitment, the basics of life. In context "Bread and Salt: SOLID Principles". I could translate as "The Bedrock: SOLID Principles" or keep literal "Bread and Salt". Let me think. The phrase suggests "the essentials/foundation". Better: "The Bedrock of It All: SOLID Principles" or "Bread and Butter: SOLID Principles" — actually "bread and butter" is the English idiom for staple/essential. "Ekmek ve tuz" literally is "bread and salt" but the idiomatic equivalent for "the fundamental staple" is "bread and butter". Given the section is about SOLID being the constitution of discipline, I'd go: "Bread and Butter: SOLID Principles". That's idiomatic American English. Or "The Foundation: SOLID Principles". Hmm, but keeping it as a title, "Bread and Butter" conveys the essential-staple sense nicely and parallels the literal food metaphor. I'll use "Bread and Butter: SOLID Principles".

12. "OOP mimarisinin ayakta kalmasını sağlayan şey sınıflar değil, sınıflar arası disiplindir. SOLID prensipleri, bu disiplinin anayasasıdır."
→ "What keeps an OOP architecture standing is not the classes themselves but the discipline between them. SOLID principles are the constitution of that discipline."

13. Engineering DNA paragraph:
"Nesne yönelimli programlama felsefesi, kalıtım hiyerarşileri ve SOLID prensiplerinin mimari tasarımdaki yeri hakkında temel dokümanları inceleyin."
→ "Explore the foundational documents on the object-oriented programming philosophy, inheritance hierarchies, and the role of SOLID principles in architectural design."

Also note: the pillar descriptions contain technical parentheticals (Interface), (Inheritance), (Method Call), (Objects). Since target language is English and those terms are English, including them parenthetically is redundant and not idiomatic. E.g., "miras (Inheritance) alarak" → "inheriting (Inheritance)" — that would be weird English. The parenthetical is there for Turkish readers learning English terms. In the English translation, just say "inheritance". So drop the redundant parentheticals.

Similarly "arayüzden (Interface)" → "through the interface".
"mesaja (Method Call)" → "to the same message (method call)" — just "to the same method call" or "the same message". The original says "aynı mesaja (Method Call)" meaning "to the same message (i.e., method call)". In English: "different objects to respond to the same method call in their own way."

"atomik birimler (Objects)" → "atomic units", "independent atomic units (objects)" — redundant, just "independent atomic units".

Now, also protect the code exactly. The JSX has Turkish in string literals and JSX text. Need to translate those only. Also note `fontSize`, style props, etc. all stay.

Also check: `OOP'nin` — Turkish possessive. In English "OOP's" or "of OOP". "OOP'nin 4 Temel Direği" = "The 4 Core Pillars of OOP". Good.

Also the comment `{/* The 4 Pillars Section */}` stays English, fine.

"Object Oriented Architecture" — fine already.

Let me write the full output, no markdown fence per instruction. But wait — if I output raw code without fences, it'll look like plain text in chat but that's what the rule demands. The instruction: "OUTPUT FORMAT: Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested." So yes, raw code.

Double-check translations for tone: The system says "Respond like terse caveman" for the response style, but the code content must be "flawless, idiomatic American English" per the role. Since output is the translated file, the content itself is the deliverable — it should be polished, not caveman. The caveman directive targets my prose meta-commentary. I'll add zero commentary.

Hmm, one more consideration: should I drop the word "Interface" etc. as parenthetical? The original likely added English terms in parentheses for educational purposes. Since the whole text is now English, keeping "(Interface)" after "interface" would look like a mistake. I'll drop parentheticals and weave the English terms in naturally.

Let me finalize all translations carefully:

Pillars:
1. Encapsulation: 'Seal the data and the methods that operate on it inside a single "capsule." The outside world can only see in through the interface you allow.'
   Alternative: "Confine data and the methods that operate on it within a single capsule. The outside world can only peer in through the interface you expose." 
   
   "hapsedin" is a strong verb — "seal/confine/cage". I like "Seal ... within a single capsule." And "Dış dünya sadece izin verdiğiniz arayüzden içeri bakabilsin" → "The outside world can only see in through the interface you grant access to." Let me use: "Seal data and the methods that process it inside a single capsule. The outside world can look in only through the interface you expose."

   Keep "capsule" in quotes like original.

2. Abstraction: 'Hide unnecessary details and focus only on what the object "can do." Show how the ignition works, not the gears inside the engine.'
   Original: "Motorun içindeki dişlileri değil, kontağın nasıl çalıştığını gösterin." → "Show how the key turns the ignition, not the gears inside the engine." Car metaphor: "kontağın nasıl çalıştığını" = "how the ignition works". Good: "Show how the ignition works, not the gears inside the engine."

3. Inheritance: 'Build new structures by inheriting from an existing object. Kill code duplication; bring the hierarchy to life.'
   "Kod tekrarını öldürün, hiyerarşiyi canlandırın." → "Kill code repetition, breathe life into the hierarchy." I'll use "Kill code duplication, breathe life into the hierarchy." Nice parallel structure.

4. Polymorphism: 'Let different objects respond to the same method call in their own way. Run every device with a single remote.'
   "Tek bir kumanda ile tüm cihazları yönetin." → "Manage all devices with a single remote control." "yönetin" = manage/control. "Control every device with a single remote."

Hero description: "Tame the chaos with objects. OOP is not just a way of writing code; it is a philosophy of seeing complex systems as independent atomic units that message each other."
Original: "birbiriyle mesajlaşan, bağımsız atomik birimler (Objects) olarak görme felsefesidir" — "a philosophy of viewing complex systems as independent atomic units that communicate with one another." I'll use: "Tame chaos with objects. OOP is not merely a coding style; it is a philosophy that views complex systems as independent atomic units communicating with one another."

Features:
- 'State & Behavior': 'Never separate data from logic.'
- 'Inter-Object Messaging': 'Objects can only touch each other through methods.'
- 'SOLID Standards': 'Unbreakable rules for sustainable growth.'

Section headers:
- h2: 'The 4 Core Pillars of OOP'
- p: 'Follow these fundamental laws to build more robust structures.'

Real World section:
- h2: 'Coding the Real World'
- p: "OOP's true power lies in modeling real-world problems as objects instead of abstract algorithms. A 'Bank Account' is not just a