# BI Surface

[English](./README.md) | [Deutsch](./README.de.md)

**Explainable Local System Visibility**

BI Surface is an open-source cybersecurity and purple-team learning project focused on making local system behaviour visible, understandable and eventually actionable.

It combines a **Python agent** with a **Next.js interface** to collect and present endpoint telemetry in real time.

The long-term goal is to evolve BI Surface into an explainable endpoint security laboratory for learning and experimenting with system telemetry, processes, network activity, detection engineering, controlled simulations and defensive response.

> BI Surface is currently in early development.

---

## Current Status

**Development version:** `0.1.0`

The current implementation can:

- connect and disconnect from the local BI Surface agent
- expose static machine and operating-system information
- collect live CPU telemetry
- collect live memory telemetry
- report available and used memory
- calculate system uptime
- refresh dynamic telemetry every `1500 ms`
- keep static system information separate from live telemetry
- represent connection states including connected, disconnected, connecting, disconnecting, timeout and error conditions

The project currently runs locally and is being developed primarily against Windows.

---

## Current Interface

BI Surface currently provides a minimal system-visibility interface while the underlying telemetry architecture is being developed.

### Connected

The connected state currently displays:

- agent status
- agent version
- hostname
- operating system
- OS version
- architecture
- processor
- physical cores
- logical cores
- live CPU usage
- total memory
- used memory
- available memory
- live memory usage
- system uptime

### Disconnected

When the local agent is unavailable or disconnected, BI Surface returns to a clean disconnected state and allows the user to reconnect.

---

## Architecture

BI Surface currently uses a small monorepo containing two applications:

```text
bi-surface/
│
├── apps/
│   ├── web/
│   │   └── Next.js + TypeScript interface
│   │
│   └── agent/
│       └── Python + FastAPI local agent
│
├── README.md
├── README.de.md
└── LICENSE
```

Current communication flow:

```text
┌──────────────────────────┐
│      Windows Host        │
│                          │
│  Hardware / OS / Memory  │
│  CPU / Uptime            │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    BI Surface Agent      │
│                          │
│  Python                  │
│  FastAPI                 │
│  Local telemetry         │
└────────────┬─────────────┘
             │
             │ HTTP / JSON
             ▼
┌──────────────────────────┐
│     BI Surface Web       │
│                          │
│  Next.js                 │
│  TypeScript              │
│  Live interface          │
└──────────────────────────┘
```

---

## API

The local agent currently exposes system information and live telemetry through versioned API endpoints.

### System information

```http
GET /api/v1/system
```

Used for relatively static information such as:

- hostname
- operating system
- OS release
- OS version
- architecture
- processor
- CPU core information
- installed memory

### Live telemetry

```http
GET /api/v1/telemetry
```

Used for dynamic information such as:

- CPU usage
- used memory
- available memory
- memory utilisation
- uptime

The frontend currently refreshes live telemetry every `1500 ms`.

---

## Local First

BI Surface is being designed around a **local-first architecture**.

The current agent and telemetry remain on the machine running BI Surface.

The project is intentionally being developed so that users can understand:

- what information is collected
- where that information comes from
- why an event or behaviour matters
- how detections are produced
- what response actions would occur

The long-term direction is **explainability rather than opaque security scoring**.

---

## Project Direction

BI Surface is intended to evolve beyond system monitoring.

The planned progression is:

```text
System Visibility
        ↓
Live Telemetry
        ↓
Process Visibility
        ↓
Sockets & Network Connections
        ↓
Event Collection
        ↓
Behaviour Correlation
        ↓
Detection Rules
        ↓
MITRE ATT&CK Mapping
        ↓
Controlled Security Simulations
        ↓
Explainable Alerts
        ↓
Manual Host Containment
        ↓
Automated Defensive Response
```

---

## Roadmap

### Phase 1 — System Visibility

- [x] local Python agent
- [x] FastAPI backend
- [x] Next.js frontend
- [x] agent connection state
- [x] static system information
- [x] live CPU telemetry
- [x] live memory telemetry
- [x] system uptime
- [x] static / dynamic telemetry separation

### Phase 2 — Product Foundation

- [ ] English / German interface
- [x] dark / light themes
- [ ] persistent UI preferences
- [ ] improved documentation
- [ ] release workflow
- [ ] reusable BI Surface UI frame system

### Phase 3 — Process Visibility

- [ ] process enumeration
- [ ] PID and parent PID
- [ ] user / owner
- [ ] CPU usage by process
- [ ] memory usage by process
- [ ] process state
- [ ] parent-child relationships

### Phase 4 — Network Visibility

- [ ] open sockets
- [ ] listening ports
- [ ] active connections
- [ ] local endpoints
- [ ] remote endpoints
- [ ] protocol and state
- [ ] process-to-connection mapping

### Phase 5 — Events & Detection

- [ ] local security event timeline
- [ ] process events
- [ ] network events
- [ ] filesystem events
- [ ] behavioural baselines
- [ ] detection rules
- [ ] explainable risk scoring
- [ ] MITRE ATT&CK mapping

### Phase 6 — Purple-Team Laboratory

- [ ] controlled local simulations
- [ ] suspicious process simulation
- [ ] abnormal socket activity
- [ ] unusual parent-child process chains
- [ ] CPU and memory anomaly simulations
- [ ] ransomware-like file activity simulation using safe test data
- [ ] detection latency measurement
- [ ] false-positive testing

### Phase 7 — Defensive Response

- [ ] investigation workflow
- [ ] manual containment
- [ ] process suspension / termination controls
- [ ] network isolation
- [ ] preserve BI Surface management communication
- [ ] explain containment triggers
- [ ] restore network access
- [ ] policy-based automated response

---

## Long-Term Vision

A future BI Surface alert may correlate several independent observations:

```text
Suspicious PowerShell activity
        +
Unknown external connection
        +
Abnormal file access
        +
SMB fan-out
        +
Recovery-service interference
        ↓
Correlated Detection
        ↓
Explainable Risk Assessment
        ↓
Security Alert
        ↓
Optional Host Containment
```

The objective is not simply to report that something is suspicious.

BI Surface should explain:

**what happened, why it matters, what evidence contributed to the detection and what defensive response is being taken.**

---

## Simulation Lab

A planned major component of BI Surface is a controlled purple-team simulation environment.

The Simulation Lab will allow safe behaviours to be reproduced on local test systems so that detection logic can be developed and evaluated without deploying destructive malware.

Example future simulations include:

- unusual process creation
- suspicious parent-child process chains
- unusual listening ports
- outbound network connections
- CPU anomalies
- memory pressure
- rapid modification of safe test files
- simulated lateral-network behaviour inside a controlled laboratory

The objective is:

```text
SIMULATE
    ↓
OBSERVE
    ↓
DETECT
    ↓
EXPLAIN
    ↓
RESPOND
    ↓
MEASURE
    ↓
IMPROVE
```

---

## Research & Case Studies

BI Surface will also serve as a public security-engineering research journal.

Future case studies may include:

- detecting suspicious PowerShell behaviour
- detecting ransomware precursors
- analysing abnormal SMB fan-out
- correlating process and network telemetry
- measuring detection latency
- reducing false positives in behavioural detections
- evaluating manual versus automated containment

Each case study is intended to connect:

```text
Code
+
Telemetry
+
Detection Logic
+
Experiment
+
Results
+
Explanation
```

---

## Technology

### Agent

- Python
- FastAPI
- system and resource telemetry
- versioned REST API

### Web

- Next.js
- React
- TypeScript
- SCSS
- local agent communication

### Planned Areas

- Windows system internals
- networking
- process telemetry
- event collection
- behavioural detection
- MITRE ATT&CK
- controlled adversary simulation
- endpoint response

---

## Interface Design

BI Surface uses a retro system-console visual language combined with modern information architecture.

The design direction includes:

- terminal-inspired typography
- reusable SVG interface frames
- semantic system colours
- live telemetry visualisation
- dark and light themes
- English and German localisation
- explainable alerts
- future interactive network visualisation

The visual design is intentionally different from traditional enterprise security dashboards while preserving clarity and accessibility.

---

## Languages

BI Surface is being developed as a bilingual project.

Supported / planned languages:

- English — canonical project language
- German — supported interface and documentation language

Source code, API properties, detection identifiers and internal system terminology remain in English.

---

## Demo

Web interface:

**https://bi-surface.vercel.app**

> The BI Surface agent currently runs locally. Some functionality therefore requires the local Python agent and cannot operate through the hosted frontend alone.

---

## Releases

BI Surface uses semantic versioning.

The first public development release is planned as:

```text
v0.1.0 — Agent Connection & Live System Telemetry
```

Future releases will be published through GitHub Releases.

---

## Support BI Surface

BI Surface is an independent, long-term open-source project.

Future support will help fund:

- development
- security research
- testing infrastructure
- laboratory hardware
- documentation
- releases
- code-signing and distribution infrastructure
- continued open-source development

A dedicated project-support option will be added as the project develops.

---

## Contributing

BI Surface is currently in an early architectural and research phase.

External code contributions are **not currently being requested** while the core architecture, telemetry model and security boundaries are being established.

Bug reports, technical discussion and feedback will be welcomed as the project matures.

---

## Security

BI Surface is a security-learning and research project under active development.

Do not currently treat BI Surface as a replacement for production EDR, antivirus or enterprise endpoint-protection software.

Security-sensitive functionality will be introduced gradually and tested inside controlled environments.

---

## Licence

BI Surface is released under the [MIT License](./LICENSE).

---

## Author

**Piotr Bania**

Founder of Bespoke Programming  
Creator of BI Surface

BI Surface is being developed alongside my transition from software engineering into cybersecurity and security engineering.

---

## Project Philosophy

```text
Explainable.
Local.
Transparent.
Built for learning.
Designed for control.
```

---

⭐ If BI Surface is interesting to you, consider starring the repository to follow its development.
