Informatik-Abgabe-Generator

Erstelle deine Informatik-Abgaben automatisch als PDF - vollständig browserbasiert, ohne Server!

🎯 Features

- 📂 Drag & Drop für Dateien
- 🎨 Automatische Aufgaben-Erkennung (z.B. "1a.java" → Aufgabe 1, Teil a)
- ✏️ Manuelle Anpassung von Aufgaben, Teilaufgaben und Reihenfolge
- 📄 PDF-Generierung mit professionellem Layout
- 🖼️ Unterstützung für Code, Bilder und Textdateien
- 📦 ZIP-Export mit PDF + Original-Dateien
- 📱 Responsive Design für Handy, Tablet und Desktop
- 🔒 100% lokal - keine Daten verlassen deinen Browser

🚀 Unterstützte Dateitypen

- .java (Java-Code)
- .txt (Text)
- .md (Markdown)
- .png, .jpg, .jpeg (Bilder)
- .uxf (UML-Diagramme)

💻 Verwendung

1. Öffne index.html in deinem Browser
2. Ziehe Dateien in die Drop-Zone oder klicke zum Hochladen
3. Bearbeite automatisch erkannte Aufgaben/Teilaufgaben bei Bedarf
4. Klicke "PDF Vorschau generieren"
5. Schau dir die Vorschau an
6. Wähle "PDF herunterladen" oder "ZIP erstellen" für den Export

📋 Dateibenennung für automatische Erkennung

Beispiele, die automatisch erkannt werden:

- 1.java → Aufgabe 1
- 1a.java → Aufgabe 1, Teil a
- 2b.java → Aufgabe 2, Teil b
- Aufgabe3.java → Aufgabe 3
- Aufgabe3c.java → Aufgabe 3, Teil c

🛠️ Technologie

- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript (keine Dependencies)
- jsPDF für PDF-Generierung
- JSZip für ZIP-Erstellung

📐 Layout im PDF

```
Aufgabe X
═════════════════════

a) Inhalt der ersten Teilaufgabe
   - Code mit Monospace-Schrift
   - Bilder eingebettet
   - Textdateien als Fließtext

b) Inhalt der zweiten Teilaufgabe
   ...

Aufgabe Y
═════════════════════
   ...
```

🎨 Funktionen im Detail

✨ Automatische Erkennung

Der Generator erkennt Aufgaben automatisch anhand des Dateinamens:
- Regex-Pattern: `^\d+[a-z]?$` (z.B. "1a", "2")
- Regex-Pattern: `^Aufgabe\d+[a-z]?$` (z.B. "Aufgabe1a")

📊 Tabellenansicht

- Übersicht aller Dateien
- Bearbeite Aufgabe, Teilaufgabe und Reihenfolge direkt
- Löschen einzelner Dateien
- Modal für erweiterte Bearbeitung

🎯 PDF-Generierung

- Professionelles Layout
- Seitenverwaltung (automatisches Umblättern)
- Bilder skaliert und zentriert
- Code mit Zeilenbegrenzung (max. 30 Zeilen pro Datei)
- Keine Dateinamen im PDF
- Keine Kopf- oder Fußzeilen

📦 ZIP-Erstellung

- Nur nach erfolgreicher PDF-Vorschau verfügbar
- Enthält: UebungsblattXX.pdf + src/Original-Dateien
- Perfekt zum Abgeben auf Moodle/StudIP

⚡ Performance

- Alle Verarbeitung im Browser
- Sofortige Vorschau
- Optimierte Dateigrößen
- Keine Wartezeit auf Server

🔐 Datenschutz

Deine Dateien bleiben 100% bei dir:
- Keine Datenübertragung ins Internet
- Keine Speicherung auf Servern
- Funktioniert auch offline

📱 Responsive Design

- Desktop: Volles Layout mit allen Funktionen
- Tablet: Optimierte Tabelle und Vorschau
- Handy: Gestapelte Layouts, Touch-optimiert

🐛 Bekannte Limitierungen

- Große Bilder werden skaliert
- Code-Dateien auf 30 Zeilen pro Datei limitiert (für PDF-Größe)
- UXF-Dateien werden als Text eingefügt

🎓 Beispiel-Workflow

1. Schreibe deine Java-Dateien: 1a.java, 1b.java, 2.java, 2a.java
2. Speichere UML-Diagramme: 1a.uxf
3. Exportiere Screenshots: 1a.png, 1b.png, 2a.png
4. Öffne den Generator
5. Ziehe alle Dateien in die Drop-Zone
6. Überprüfe die Vorschau
7. Klicke "ZIP erstellen"
8. Lade auf dein Portal hoch - fertig! ✨

👨‍💻 Entwicklung

Das Projekt verwendet nur Browser-APIs und externe CDN-Bibliotheken:
- jsPDF (NPM CDN)
- JSZip (NPM CDN)

Keine Build-Tools erforderlich - einfach HTML öffnen und los geht's!

📄 Lizenz

Frei verwendbar für Bildungszwecke.

💡 Tipps & Tricks

- Nutze aussagekräftige Dateinamen für automatische Erkennung
- Überprüfe die PDF-Vorschau vor dem Download
- Verwende die manuelle Bearbeitung nur bei Bedarf
- Speichere regelmäßig als ZIP für Backups

🤝 Feedback

Funktioniert perfekt für deine Abgaben? Teile dein Feedback! 😊
