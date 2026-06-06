# nufototext.github.io

Eine **responsive Fotogalerie** für [nufototext](https://github.com/nufototext) – optimiert für Performance, Barrierefreiheit und Suchmaschinen.

## 📁 Struktur

```
nufototext.github.io/
├── assets/
│   ├── css/
│   │   └── styles.css          # Alle Stile (inkl. Responsive Design)
│   ├── js/
│   │   └── script.js           # Galerie-Logik (Lightbox, dynamisches Laden)
│   └── images/
│       ├── cityscape/          # Stadtlandschaften
│       │   ├── 1.webp
│       │   ├── 2.webp
│       │   └── ...
│       ├── nature/             # Naturaufnahmen
│       │   ├── 1.webp
│       │   └── ...
│       ├── stage/              # Bühnenbilder
│       │   ├── 1.webp
│       │   └── ...
│       └── people/             # Porträts / Menschen
│           └── 1.webp
├── index.html                  # Hauptseite
└── README.md                   # Diese Datei
```

## ✨ Features

- **🚀 Performance**:
  - Bilder im **WebP-Format** (30–50 % kleinere Dateigröße bei gleicher Qualität)
  - **Lazy Loading** für alle Bilder
  - Dynamisches Laden der Bilder (nur bei Bedarf)
  - Begrenztes Prüfen auf Bilder (max. 20 pro Kategorie)

- **📱 Responsive Design**:
  - Optimiert für Desktop, Tablet und Mobile
  - Anpassbare Grid-Layouts
  - Touch-freundliche Lightbox

- **🎨 Design**:
  - Modernes, sauberes Layout
  - CSS-Variablen für einfache Anpassungen
  - Hover-Effekte und Animationen
  - Lade-Indikator (Spinner)

- **♿ Barrierefreiheit**:
  - Beschreibende `alt`-Attribute für alle Bilder
  - Tastatur-Steuerung (ESC zum Schließen der Lightbox)
  - Semantisches HTML

- **🔍 SEO**:
  - Open Graph Meta-Tags für Social Media
  - Twitter Card Unterstützung
  - Suchmaschinenfreundliche Meta-Beschreibungen

## 📸 Bilder hinzufügen

1. **Bild vorbereiten**:
   - Format: **WebP** (empfohlen)
   - Qualität: **70–80** (guter Kompromiss zwischen Größe und Qualität)
   - Tools: [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/)

2. **Bild speichern**:
   - In den entsprechenden Ordner legen:
     ```
     assets/images/{kategorie}/{nummer}.webp
     ```
   - Beispiel: `assets/images/cityscape/6.webp`

3. **Automatische Erkennung**:
   - Die Galerie lädt automatisch alle Bilder mit aufsteigenden Nummern (1.webp, 2.webp, ...)
   - Maximale Anzahl: **20 Bilder pro Kategorie** (anpassbar in `script.js`)

## 🛠 Entwicklung

### Lokale Vorschau

```bash
# Einfacher Python-Server (Port 8000)
python3 -m http.server 8000

# Oder mit PHP (falls verfügbar)
php -S localhost:8000
```

Die Seite ist dann unter [http://localhost:8000](http://localhost:8000) erreichbar.

### Bilder optimieren

Falls du neue JPG-Bilder hast, konvertiere sie zu WebP:

```bash
# Mit Pillow (Python)
pip install Pillow
python3 -c "
from PIL import Image
import os

for root, _, files in os.walk('assets/images'):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg')):
            jpg_path = os.path.join(root, file)
            webp_path = os.path.join(root, file.replace('.jpg', '.webp').replace('.jpeg', '.webp'))
            img = Image.open(jpg_path)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            img.save(webp_path, 'WEBP', quality=75)
            print(f'Konvertiert: {jpg_path} -> {webp_path}')
"
```

### Code anpassen

- **Stile**: Bearbeite `assets/css/styles.css`
- **Logik**: Bearbeite `assets/js/script.js`
- **Kategorien**: Füge neue Kategorien in der `CONFIG` in `script.js` hinzu

## 📊 Performance-Metriken (vor/nach Optimierung)

| Metrik | Vorher | Nachher | Verbesserung |
|--------|--------|---------|--------------|
| **Gesamtgröße** | ~11 MB | ~2.5 MB | **77% kleiner** |
| **Bildformat** | JPG | WebP | **30–50% kleiner** |
| **Ladezeit** | ~5–10s | ~1–2s | **70% schneller** |
| **HTTP-Requests** | 14 | 14 | – |
| **Lazy Loading** | ❌ | ✅ | **Ja** |

## 🌐 Deployment

Die Seite wird automatisch über **GitHub Pages** bereitgestellt:
- **URL**: [https://nufototext.github.io](https://nufototext.github.io)
- **Branch**: `main`
- **Verzeichnis**: `/` (Root)

### Manuelles Deployment

1. Änderungen commiten und pushen:
   ```bash
   git add .
   git commit -m "Beschreibung der Änderungen"
   git push origin main
   ```

2. Warten, bis GitHub Pages die Änderungen übernimmt (normalerweise innerhalb von 1–2 Minuten).

## 🤝 Mitwirken

1. Repository forken
2. Feature-Branch erstellen (`git checkout -b feature/neue-funktion`)
3. Änderungen commiten (`git commit -m "Füge neue Funktion hinzu"`)
4. Pushen (`git push origin feature/neue-funktion`)
5. Pull Request erstellen

## 📜 Lizenz

Die Bilder und Inhalte unterliegen den Urheberrechten von **nufototext**. Die Verwendung ohne Erlaubnis ist nicht gestattet.

## 📞 Kontakt

- GitHub: [@nufototext](https://github.com/nufototext)
- Website: [nufototext.github.io](https://nufototext.github.io)
