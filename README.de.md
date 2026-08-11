# BI Surface

[English](./README.md) | [Deutsch](./README.de.md)

**Erklärbare lokale Systemtransparenz**

BI Surface ist ein Open-Source-Projekt für Cybersecurity und Purple-Team-Lernen mit dem Ziel, lokales Systemverhalten sichtbar, verständlich und langfristig auch steuerbar zu machen.

Das Projekt kombiniert einen **Python-Agenten** mit einer **Next.js-Oberfläche**, um Endpoint-Telemetrie in Echtzeit zu erfassen und darzustellen.

Langfristig soll sich BI Surface zu einem erklärbaren Endpoint-Security-Labor entwickeln, in dem Systemtelemetrie, Prozesse, Netzwerkaktivität, Detection Engineering, kontrollierte Simulationen und defensive Reaktionen untersucht werden können.

> BI Surface befindet sich derzeit in einer frühen Entwicklungsphase.

---

## Aktueller Stand

**Entwicklungsversion:** `0.1.0`

Die aktuelle Implementierung kann:

- eine Verbindung zum lokalen BI-Surface-Agenten herstellen und trennen
- statische Maschinen- und Betriebssysteminformationen erfassen
- CPU-Telemetrie live erfassen
- Speichernutzung live erfassen
- verfügbaren und verwendeten Arbeitsspeicher anzeigen
- die Systemlaufzeit berechnen
- dynamische Telemetrie alle `1500 ms` aktualisieren
- statische Systeminformationen von Live-Telemetrie trennen
- verschiedene Verbindungszustände wie verbunden, getrennt, Verbindungsaufbau, Trennen, Timeout und Fehler darstellen

Das Projekt läuft derzeit lokal und wird hauptsächlich unter Windows entwickelt.

---

## Aktuelle Oberfläche

BI Surface bietet derzeit eine minimalistische Oberfläche zur Systembeobachtung, während die zugrunde liegende Telemetrie-Architektur weiterentwickelt wird.

### Verbunden

Im verbundenen Zustand werden derzeit folgende Informationen angezeigt:

- Agentenstatus
- Agentenversion
- Hostname
- Betriebssystem
- Betriebssystemversion
- Architektur
- Prozessor
- physische Kerne
- logische Kerne
- aktuelle CPU-Auslastung
- gesamter Arbeitsspeicher
- verwendeter Arbeitsspeicher
- verfügbarer Arbeitsspeicher
- aktuelle Speicherauslastung
- Systemlaufzeit

### Getrennt

Wenn der lokale Agent nicht erreichbar oder getrennt ist, kehrt BI Surface in einen klaren Offline-Zustand zurück und ermöglicht eine erneute Verbindung.

---

## Architektur

BI Surface verwendet derzeit ein kleines Monorepo mit zwei Anwendungen:

```text
bi-surface/
│
├── apps/
│   ├── web/
│   │   └── Next.js + TypeScript Benutzeroberfläche
│   │
│   └── agent/
│       └── Python + FastAPI lokaler Agent
│
├── README.md
├── README.de.md
└── LICENSE
```

Aktueller Kommunikationsfluss:

```text
┌──────────────────────────┐
│       Windows Host       │
│                          │
│ Hardware / OS / Speicher │
│ CPU / Laufzeit           │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    BI Surface Agent      │
│                          │
│ Python                   │
│ FastAPI                  │
│ Lokale Telemetrie        │
└────────────┬─────────────┘
             │
             │ HTTP / JSON
             ▼
┌──────────────────────────┐
│     BI Surface Web       │
│                          │
│ Next.js                  │
│ TypeScript               │
│ Live-Oberfläche          │
└──────────────────────────┘
```

---

## API

Der lokale Agent stellt Systeminformationen und Live-Telemetrie über versionierte API-Endpunkte bereit.

### Systeminformationen

```http
GET /api/v1/system
```

Für relativ statische Informationen wie:

- Hostname
- Betriebssystem
- OS-Release
- OS-Version
- Architektur
- Prozessor
- CPU-Kerne
- installierter Arbeitsspeicher

### Live-Telemetrie

```http
GET /api/v1/telemetry
```

Für dynamische Informationen wie:

- CPU-Auslastung
- verwendeter Arbeitsspeicher
- verfügbarer Arbeitsspeicher
- Speicherauslastung
- Systemlaufzeit

Die Benutzeroberfläche aktualisiert die Live-Telemetrie derzeit alle `1500 ms`.

---

## Local First

BI Surface wird mit einer **Local-First-Architektur** entwickelt.

Der aktuelle Agent und die erfasste Telemetrie verbleiben auf dem Computer, auf dem BI Surface ausgeführt wird.

Das Projekt wird bewusst so entwickelt, dass Benutzer nachvollziehen können:

- welche Informationen erfasst werden
- woher diese Informationen stammen
- warum ein Ereignis oder Verhalten relevant ist
- wie eine Erkennung zustande kommt
- welche Reaktion ausgeführt werden würde

Langfristig steht **Erklärbarkeit statt undurchsichtiger Security Scores** im Mittelpunkt.

---

## Projektrichtung

BI Surface soll sich deutlich über einen einfachen Systemmonitor hinausentwickeln.

Die geplante Entwicklung:

```text
Systemtransparenz
        ↓
Live-Telemetrie
        ↓
Prozesssichtbarkeit
        ↓
Sockets & Netzwerkverbindungen
        ↓
Ereigniserfassung
        ↓
Verhaltenskorrelation
        ↓
Detection Rules
        ↓
MITRE ATT&CK Mapping
        ↓
Kontrollierte Security-Simulationen
        ↓
Erklärbare Warnungen
        ↓
Manuelle Host-Isolation
        ↓
Automatisierte defensive Reaktion
```

---

## Roadmap

### Phase 1 — Systemtransparenz

- [x] lokaler Python-Agent
- [x] FastAPI-Backend
- [x] Next.js-Frontend
- [x] Agent-Verbindungszustände
- [x] statische Systeminformationen
- [x] Live-CPU-Telemetrie
- [x] Live-Speichertelemetrie
- [x] Systemlaufzeit
- [x] Trennung von statischen und dynamischen Daten

### Phase 2 — Produktgrundlage

- [ ] englische / deutsche Oberfläche
- [x] Dark / Light Theme
- [ ] gespeicherte UI-Einstellungen
- [ ] erweiterte Dokumentation
- [ ] Release-Workflow
- [ ] wiederverwendbares BI-Surface-UI-Frame-System

### Phase 3 — Prozesssichtbarkeit

- [ ] Prozessauflistung
- [ ] PID und Parent PID
- [ ] Benutzer / Eigentümer
- [ ] CPU-Nutzung pro Prozess
- [ ] Speichernutzung pro Prozess
- [ ] Prozessstatus
- [ ] Parent-Child-Beziehungen

### Phase 4 — Netzwerksichtbarkeit

- [ ] offene Sockets
- [ ] Listening Ports
- [ ] aktive Verbindungen
- [ ] lokale Endpoints
- [ ] entfernte Endpoints
- [ ] Protokoll und Status
- [ ] Zuordnung zwischen Prozess und Verbindung

### Phase 5 — Events & Detection

- [ ] lokale Security-Event-Timeline
- [ ] Prozessereignisse
- [ ] Netzwerkereignisse
- [ ] Dateisystemereignisse
- [ ] Verhaltens-Baselines
- [ ] Detection Rules
- [ ] erklärbare Risikobewertung
- [ ] MITRE ATT&CK Mapping

### Phase 6 — Purple-Team-Labor

- [ ] kontrollierte lokale Simulationen
- [ ] Simulation ungewöhnlicher Prozesse
- [ ] ungewöhnliche Socket-Aktivität
- [ ] ungewöhnliche Parent-Child-Prozessketten
- [ ] CPU- und Speicheranomalien
- [ ] ransomwareähnliche Dateiaktivität mit sicheren Testdaten
- [ ] Messung der Detection-Latenz
- [ ] False-Positive-Tests

### Phase 7 — Defensive Reaktion

- [ ] Untersuchungsworkflow
- [ ] manuelle Eindämmung
- [ ] Prozess-Suspendierung / Beendigung
- [ ] Netzwerkisolation
- [ ] BI-Surface-Management-Kommunikation aufrechterhalten
- [ ] Isolationstrigger erklären
- [ ] Netzwerkzugriff wiederherstellen
- [ ] regelbasierte automatische Reaktion

---

## Langfristige Vision

Eine zukünftige BI-Surface-Erkennung könnte mehrere unabhängige Beobachtungen miteinander korrelieren:

```text
Verdächtige PowerShell-Aktivität
        +
Unbekannte externe Verbindung
        +
Ungewöhnlicher Dateizugriff
        +
SMB-Fan-out
        +
Beeinträchtigung von Recovery-Diensten
        ↓
Korrelierte Erkennung
        ↓
Erklärbare Risikobewertung
        ↓
Security Alert
        ↓
Optionale Host-Isolation
```

Das Ziel besteht nicht nur darin zu melden, dass etwas verdächtig ist.

BI Surface soll erklären:

**was passiert ist, warum es relevant ist, welche Beweise zur Erkennung geführt haben und welche defensive Reaktion ausgeführt wird.**

---

## Simulation Lab

Ein geplanter zentraler Bestandteil von BI Surface ist eine kontrollierte Purple-Team-Simulationsumgebung.

Das Simulation Lab soll es ermöglichen, sichere Verhaltensmuster auf lokalen Testsystemen zu reproduzieren, damit Detection-Logik entwickelt und ausgewertet werden kann, ohne destruktive Malware einzusetzen.

Geplante Simulationen umfassen beispielsweise:

- ungewöhnliche Prozessstarts
- verdächtige Parent-Child-Prozessketten
- ungewöhnliche Listening Ports
- ausgehende Netzwerkverbindungen
- CPU-Anomalien
- Speicherdruck
- schnelle Änderung sicherer Testdateien
- simuliertes laterales Netzwerkverhalten innerhalb eines kontrollierten Labors

Das Ziel:

```text
SIMULIEREN
    ↓
BEOBACHTEN
    ↓
ERKENNEN
    ↓
ERKLÄREN
    ↓
REAGIEREN
    ↓
MESSEN
    ↓
VERBESSERN
```

---

## Forschung & Fallstudien

BI Surface soll gleichzeitig als öffentliches Security-Engineering-Forschungsjournal dienen.

Zukünftige Fallstudien könnten umfassen:

- Erkennung verdächtiger PowerShell-Aktivität
- Erkennung von Ransomware-Vorläufern
- Analyse ungewöhnlicher SMB-Fan-outs
- Korrelation von Prozess- und Netzwerk-Telemetrie
- Messung der Detection-Latenz
- Reduzierung von False Positives
- Vergleich manueller und automatisierter Eindämmung

Jede Fallstudie soll folgende Bereiche miteinander verbinden:

```text
Code
+
Telemetrie
+
Detection-Logik
+
Experiment
+
Ergebnisse
+
Erklärung
```

---

## Technologien

### Agent

- Python
- FastAPI
- System- und Ressourcen-Telemetrie
- versionierte REST-API

### Web

- Next.js
- React
- TypeScript
- SCSS
- Kommunikation mit lokalem Agenten

### Geplante Bereiche

- Windows-Systeminternals
- Networking
- Prozess-Telemetrie
- Ereigniserfassung
- verhaltensbasierte Detection
- MITRE ATT&CK
- kontrollierte Adversary-Simulation
- Endpoint Response

---

## Interface Design

BI Surface kombiniert die visuelle Sprache klassischer Systemkonsolen mit moderner Informationsarchitektur.

Die Designrichtung umfasst:

- terminal-inspirierte Typografie
- wiederverwendbare SVG-Interface-Frames
- semantische Systemfarben
- Live-Telemetrie-Visualisierung
- Dark- und Light-Themes
- englische und deutsche Lokalisierung
- erklärbare Alerts
- zukünftige interaktive Netzwerkvisualisierung

Das Interface soll sich bewusst von klassischen Enterprise-Security-Dashboards unterscheiden, ohne Klarheit oder Zugänglichkeit zu verlieren.

---

## Sprachen

BI Surface wird als zweisprachiges Projekt entwickelt.

Unterstützte / geplante Sprachen:

- Englisch — kanonische Projektsprache
- Deutsch — unterstützte Interface- und Dokumentationssprache

Quellcode, API-Eigenschaften, Detection-IDs und interne Systembegriffe bleiben auf Englisch.

---

## Demo

Web-Oberfläche:

**https://bi-surface.vercel.app**

> Der BI-Surface-Agent läuft derzeit lokal. Einige Funktionen benötigen deshalb den lokalen Python-Agenten und funktionieren nicht ausschließlich über das gehostete Frontend.

---

## Releases

BI Surface verwendet Semantic Versioning.

Das erste öffentliche Development Release ist geplant als:

```text
v0.1.0 — Agent Connection & Live System Telemetry
```

Zukünftige Releases werden über GitHub Releases veröffentlicht.

---

## BI Surface unterstützen

BI Surface ist ein unabhängiges, langfristiges Open-Source-Projekt.

Zukünftige Unterstützung soll unter anderem folgende Bereiche ermöglichen:

- Entwicklung
- Security Research
- Testinfrastruktur
- Laborhardware
- Dokumentation
- Releases
- Code-Signing und Distribution
- langfristige Open-Source-Entwicklung

Eine eigene Möglichkeit zur Unterstützung des Projekts wird mit der weiteren Entwicklung ergänzt.

---

## Mitwirken

BI Surface befindet sich derzeit noch in einer frühen Architektur- und Forschungsphase.

Externe Code-Beiträge werden **derzeit noch nicht aktiv angenommen**, solange Kernarchitektur, Telemetriemodell und Security-Grenzen definiert werden.

Bug Reports, technische Diskussionen und Feedback sollen mit zunehmender Reife des Projekts willkommen sein.

---

## Sicherheit

BI Surface ist ein Cybersecurity-Lern- und Forschungsprojekt in aktiver Entwicklung.

BI Surface sollte derzeit nicht als Ersatz für produktive EDR-, Antivirus- oder Enterprise-Endpoint-Protection-Lösungen betrachtet werden.

Sicherheitskritische Funktionen werden schrittweise eingeführt und zunächst in kontrollierten Umgebungen getestet.

---

## Lizenz

BI Surface wird unter der [MIT-Lizenz](./LICENSE) veröffentlicht.

---

## Autor

**Piotr Bania**

Gründer von Bespoke Programming  
Entwickler von BI Surface

BI Surface entsteht parallel zu meinem Übergang von Software Engineering in Richtung Cybersecurity und Security Engineering.

---

## Projektphilosophie

```text
Erklärbar.
Lokal.
Transparent.
Zum Lernen entwickelt.
Für Kontrolle konzipiert.
```

---

⭐ Wenn BI Surface für dich interessant ist, kannst du dem Repository einen Star geben und die weitere Entwicklung verfolgen.
