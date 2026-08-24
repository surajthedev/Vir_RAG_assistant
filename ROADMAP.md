# 🗺️ Vir Campus AI Platform — Strategic Roadmap

**Vir** is an autonomous, bilingual (**Tamil & English**), voice-enabled AI Campus Copilot built for **P.T. Lee Chengalvaraya Naicker College of Engineering and Technology (PT Lee CNCET)**.

---

## 🎯 North Star Goal & Vision

> To create a unified, high-speed, intelligent campus assistant serving **students, faculty, and campus visitors** across a three-stage platform rollout: **Web Application ➔ Mobile PWA ➔ Campus Touchscreen Kiosks**.

---

## 👥 Target User Personas & Capabilities

```
                             ┌──────────────────────────────────┐
                             │       VIR CAMPUS AI COPILOT      │
                             └─────────────────┬────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
      🎓 STUDENTS                     👨‍🏫 FACULTY & ADMIN             👪 VISITORS & ASPIRANTS
  • Internal Marks & Arrears      • Department Summaries          • 7.5% Govt School Quota Details
  • Attendance & Eligibility      • Faculty Directory & Cabins    • Admission Procedures & Fees
  • Regulations (R2021 / R2025)   • Class Batch Performance       • College Prospectus & Rules
  • GPA/CGPA Calculation Formulas • Room / Facility Schedules     • Bus Transport Routes & Timings
  • Indoor Turn-by-Turn Routing   • Student Profile Lookups       • Campus Navigation & Helpdesk
```

---

## 🛣️ Phased Implementation Plan

```
  ┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
  │        PHASE 1         │      │        PHASE 2         │      │        PHASE 3         │
  │ Real-Time SSE Stream   │ ───► │  Bilingual Voice & STT │ ───► │ Multi-Surface Rollout  │
  │ & Performance Engine   │      │   (Tamil + English)    │      │  (Web ➔ App ➔ Kiosk)   │
  └────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

---

### 🚀 Phase 1: Real-Time SSE Token Streaming & Performance Engine (Immediate)

* **Objective**: Eliminate blocking API waits; achieve **< 1.5s time-to-first-token** with live intermediate reasoning feedback.
* **Key Deliverables**:
  - [ ] **FastAPI Server-Sent Events (SSE)**: Implement `POST /chat/stream` using `StreamingResponse` yielding tokens in real time.
  - [ ] **Live Reasoning Indicators**: Stream status events to the UI during tool execution:
    - 🔍 *"Searching academic regulations & policies..."*
    - 📊 *"Querying student marks & attendance database..."*
    - 🗺️ *"Calculating shortest indoor walking path..."*
  - [ ] **Streamlit Direct SSE Integration**: Replace simulated word-delay streaming with real-time SSE consumption.
  - [ ] **Token Budget Counter & Dynamic History Pruner**: Prevent context bloating across extended multi-turn conversations.
  - [ ] **Deterministic Qdrant Point IDs**: Migrate to UUID5 point generation to prevent duplicate chunk storage ([#17](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/17)).

---

### 🎙️ Phase 2: Bilingual (Tamil & English) Voice Interface

* **Objective**: Enable full accessibility for Tamil-speaking students, parents, and visitors through speech recognition and bilingual grounding.
* **Key Deliverables**:
  - [ ] **Speech-to-Text (STT)**: In-browser voice input recording via Web Speech API + OpenAI Whisper API fallback.
  - [ ] **Tamil & Tanglish Query Processing**:
    - Automatic input language detection (Tamil / Tanglish / English).
    - Bilingual system prompts for accurate terminology translation (e.g., 7.5% அரசு பள்ளி ஒதுக்கீடு, தேர்வு விதிமுறைகள், பேருந்து அட்டவணை).
  - [ ] **Text-to-Speech (TTS)**: Synthesized audio responses for kiosk and mobile listening.
  - [ ] **Tamil Nadu 7.5% Quota Knowledge Hub**: Complete policy guidelines covering free tuition, hostel, and Anna University affiliation rules.

---

### 🧠 Phase 3: Smart Academic & Visual Tools

* **Objective**: Provide proactive academic planning and interactive visual assistance.
* **Key Deliverables**:
  - [ ] **Interactive 2D Campus Floor Plan**: Visual SVG/Canvas map rendering alongside Dijkstra turn-by-turn walking text.
  - [ ] **GPA / CGPA Target Calculator**: Tool enabling students to calculate required internal marks to reach target grades.
  - [ ] **Arrear Clearance Planner**: Step-by-step roadmap mapping prerequisite subjects and exam schedules.
  - [ ] **Intelligent Document Clause Parser**: Automatic extraction and tagging of Anna University regulation clauses ([#14](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/14)).

---

### 📱 Phase 4: Multi-Surface Rollout Strategy

| Surface | Platform | Target Deployment | Features |
|---|---|---|---|
| **Surface 1: Web** | Responsive Web App | Campus-wide URL | Full text + voice chat, document upload, responsive layout |
| **Surface 2: Mobile / PWA** | Progressive Web App | Student & Faculty smartphones | Installable icon, offline campus map caching, push alerts |
| **Surface 3: Campus Kiosk** | Touchscreen Terminal | Campus Entrance & Library | Fullscreen kiosk UI, high-gain mic button, visual 2D wayfinding |

---

## 🛠️ Architecture Stack & Infrastructure

| Layer | Technology | Role |
|---|---|---|
| **Agent Reasoning** | Groq API (`openai/gpt-oss-20b` / `llama-3.3-70b-versatile`) | Multi-round tool calling & answer synthesis |
| **Streaming Protocol** | Server-Sent Events (SSE) / `StreamingResponse` | Real-time token & progress transmission |
| **Voice Processing** | Web Speech API + OpenAI Whisper | Speech-to-Text (STT) & Text-to-Speech (TTS) |
| **Dense Vector RAG** | Qdrant Cloud + Jina AI Embeddings v3 | Semantic search over regulations, prospectus, policies |
| **Tabular SQL Engine** | SQLite 3 (`app.db` with 3-layer security lockdown) | Fast, structured queries on student & faculty data |
| **Session Memory** | SQLite 3 (`sessions.db`) | Persistent multi-turn conversation context |
| **Pathfinding Engine** | Topological Campus Graph + Dijkstra Algorithm | Multi-floor shortest-path walking directions |
| **Backend** | FastAPI + Uvicorn (Asynchronous Python) | High-performance API gateway |
| **Frontend** | Streamlit / Modern Web Components | Interactive web chat interface |

---

## 📊 GitHub Issues & Tracking Alignment

- **Phase 1 Milestone**: [#15](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/15) (SSE Streaming), [#17](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/17) (Deterministic Point IDs), [#18](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/18) (Tenacity Retries), [#11](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/11) (Rate Limiting).
- **Phase 2 Milestone**: Bilingual Tamil prompt grounding & Whisper STT integration.
- **Phase 3 Milestone**: [#14](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/14) (Clause Parser), [#19](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/19) (ETL/Sync), [#21](https://github.com/TNlucfer01/Vir_RAG_assistant/issues/21) (Map Codebase Unification).
