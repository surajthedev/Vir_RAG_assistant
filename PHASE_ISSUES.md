# 📋 Vir Campus AI — Phased Implementation GitHub Issues

This document contains pre-structured **GitHub Issues** mapped directly to the four phases in [`ROADMAP.md`](file:///home/darkemperor/aathi/7th%20sem/Vir_RAG_assistant/Vir_RAG_assistant/ROADMAP.md). You can copy-paste these into GitHub or run the provided `gh issue create` CLI commands as you roll out each milestone.

---

## 📑 Table of Contents

- [Phase 1: Real-Time SSE Streaming & Performance Engine](#-phase-1-real-time-sse-streaming--performance-engine)
- [Phase 2: Bilingual (Tamil & English) Voice Interface](#-phase-2-bilingual-tamil--english-voice-interface)
- [Phase 3: Smart Academic & Interactive Visual Tools](#-phase-3-smart-academic--interactive-visual-tools)
- [Phase 4: Multi-Surface Rollout (Web ➔ Mobile PWA ➔ Kiosk)](#-phase-4-multi-surface-rollout-web--mobile-pwa--kiosk)

---

# 🚀 Phase 1: Real-Time SSE Streaming & Performance Engine

### Issue 1.1: `[Phase 1] [Backend] Implement FastAPI Server-Sent Events (SSE) /chat/stream Endpoint`
- **Labels**: `enhancement`, `backend`, `performance`, `phase-1`
- **Priority**: 🔴 Critical
- **Description**:
  ```markdown
  ### Problem Description
  The current `/chat` endpoint is a synchronous blocking POST request. The client must wait for all agent reasoning rounds to conclude (up to 6-8 seconds on hybrid queries) before receiving any response payload.

  ### Proposed Solution
  1. Create a streaming endpoint `POST /chat/stream` using FastAPI's `StreamingResponse` with `media_type="text/event-stream"`.
  2. Implement an asynchronous generator yielding Server-Sent Events (SSE) for:
     - Session initialization
     - Live tool status events (`event: status`)
     - Groq token stream chunks (`event: token`)
     - Final metadata and follow-up questions (`event: done`)
  3. Ensure exception handling yields clean error events without hanging the stream.

  ### Acceptance Criteria
  - `POST /chat/stream` streams tokens in real time with `< 1.5s` time-to-first-token.
  - Streaming works seamlessly across both single-tool and multi-round agent queries.
  ```
- **CLI Command**:
  ```bash
  gh issue create --title "[Phase 1] [Backend] Implement FastAPI Server-Sent Events (SSE) /chat/stream Endpoint" --label "enhancement,phase-1" --body "See PHASE_ISSUES.md for full specs."
  ```

---

### Issue 1.2: `[Phase 1] [Agent] Stream Intermediate Tool-Execution Status Events`
- **Labels**: `enhancement`, `agent`, `ux`, `phase-1`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  When the agent executes multi-round reasoning (e.g. SQL query followed by vector search), the user sees no feedback on what tools are running in the background.

  ### Proposed Solution
  1. Modify `services/agent.py` to accept an event callback or yield status events:
     - When `vector_search` is called: `{"status": "searching_docs", "message": "🔍 Searching academic regulations & policies..."}`
     - When `sql_query` is called: `{"status": "querying_db", "message": "📊 Querying student & marks database..."}`
     - When `find_path` is called: `{"status": "navigating", "message": "🗺️ Calculating shortest indoor walking path..."}`
  2. Forward these status events over the SSE stream to display animated progress in the UI.

  ### Acceptance Criteria
  - Intermediate tool calls are visually reported to the user as they happen.
  ```

---

### Issue 1.3: `[Phase 1] [Frontend] Consume Real-Time SSE Stream in Streamlit Web UI`
- **Labels**: `enhancement`, `frontend`, `phase-1`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  `ui/api.py` currently receives the entire JSON answer and simulates streaming by slicing words with `time.sleep()`.

  ### Proposed Solution
  1. Update `ui/api.py` to use `requests.post(..., stream=True)` or `sseclient-py` to consume the `/chat/stream` endpoint.
  2. Render tokens directly to `st.write_stream` as they arrive over the wire.
  3. Display the live status badges (e.g., "🔍 Searching documents...") above the streaming response.

  ### Acceptance Criteria
  - UI renders incoming tokens in real-time as Groq generates them.
  - No synthetic client-side word-splitting delays.
  ```

---

### Issue 1.4: `[Phase 1] [Performance] Add Token Budget Tracker and Dynamic Context Pruner in Agent Loop`
- **Labels**: `performance`, `agent`, `phase-1`
- **Priority**: 🟡 Medium
- **Description**:
  ```markdown
  ### Problem Description
  In multi-round agent interactions, tool results (e.g., large tables or chunks) and conversation history accumulate, risking context window exhaustion and increased latency.

  ### Proposed Solution
  1. Add a lightweight token estimation / counting utility in `services/agent.py`.
  2. Enforce a context budget cap: if total messages exceed 12,000 tokens, summarize or truncate earlier history turns.
  3. Keep system instructions and the most recent 4 turns prioritized.

  ### Acceptance Criteria
  - Agent message context never exceeds predefined token budget limits.
  - Multi-turn chats remain fast and error-free even after 15+ turns.
  ```

---

# 🎙️ Phase 2: Bilingual (Tamil & English) Voice Interface

### Issue 2.1: `[Phase 2] [Voice] Add Browser Speech-to-Text (STT) with Web Speech API & Whisper Fallback`
- **Labels**: `enhancement`, `voice`, `phase-2`
- **Priority**: 🔴 Critical
- **Description**:
  ```markdown
  ### Problem Description
  Users on mobile or kiosk terminals need hands-free speech input in both Tamil and English without typing.

  ### Proposed Solution
  1. Add a microphone input component in the UI using the browser's native Web Speech API (`webkitSpeechRecognition`) for zero-latency local transcription.
  2. Add backend fallback audio transcription endpoint `POST /voice/transcribe` powered by OpenAI Whisper (`whisper-large-v3` via Groq) for recorded audio clips when Web Speech API is unsupported.
  3. Auto-populate the chat input with transcribed speech.

  ### Acceptance Criteria
  - Users can click/touch a microphone button to speak their query in English or Tamil.
  - Speech is transcribed with high accuracy into the prompt bar.
  ```

---

### Issue 2.2: `[Phase 2] [NLP] Implement Language Detection & Bilingual Tamil/English Prompt Grounding`
- **Labels**: `enhancement`, `nlp`, `multilingual`, `phase-2`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  Campus visitors, parents, and first-year students frequently ask questions in Tamil or Tanglish (Tamil written in Latin script), but the agent prompt is currently English-only.

  ### Proposed Solution
  1. Add lightweight script & language detection on user queries.
  2. Update `AGENT_SYSTEM_PROMPT` in `services/agent.py` to support bilingual reasoning:
     - If query is in Tamil or Tanglish, translate intent to English for tool queries (SQL / vector search), then synthesize the final answer in natural, clear Tamil (தமிழ்).
     - Include standardized campus Tamil glossary (e.g., வருகை பதிவு = Attendance, தேர்வு விதிமுறைகள் = Exam Regulations, கட்டண விவரங்கள் = Fee Details).

  ### Acceptance Criteria
  - Queries asked in Tamil (e.g., "7.5% அரசு பள்ளி ஒதுக்கீடு பற்றிய விவரங்களை கூறுங்கள்") receive accurate, polite responses in Tamil.
  - Tool calling accurately bridges Tamil queries with English databases.
  ```

---

### Issue 2.3: `[Phase 2] [Voice] Add Text-to-Speech (TTS) Synthesizer for Audio Responses`
- **Labels**: `enhancement`, `voice`, `phase-2`
- **Priority**: 🟡 Medium
- **Description**:
  ```markdown
  ### Problem Description
  Campus kiosk visitors and visually impaired students require voice playback of answers, directions, and policy explanations.

  ### Proposed Solution
  1. Integrate browser-native `speechSynthesis` API for instantaneous English and Tamil audio playback.
  2. Add an audio playback button next to assistant messages in the chat interface.
  3. Ensure markdown formatting (asterisks, bullet points) is stripped before passing text to the speech synthesizer.

  ### Acceptance Criteria
  - Clicking "🔊 Listen" plays clear, natural audio of the assistant's answer in the corresponding language.
  ```

---

### Issue 2.4: `[Phase 2] [Knowledge] Ingest Complete Tamil Nadu 7.5% Govt School Quota & Anna University Rules`
- **Labels**: `documentation`, `knowledge`, `phase-2`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  Students from government schools (6th to 12th standard) under the Tamil Nadu 7.5% engineering quota are entitled to 100% tuition, development, hostel (within cap), and counselling fee coverage. Students need authoritative guidance on fee legality and official breakup verification.

  ### Proposed Solution
  1. Ingest official Tamil Nadu Government orders and Anna University 7.5% quota directives into Qdrant vector database.
  2. Add grounding rules to ensure Vir clarifies that colleges cannot compel 7.5% quota students to pay unapproved fees (association, placement, store fees) and outlines procedures to request fee breakups.

  ### Acceptance Criteria
  - Queries regarding 7.5% quota, scholarship benefits, and fee exemptions return exact government-backed information.
  ```

---

# 🧠 Phase 3: Smart Academic & Interactive Visual Tools

### Issue 3.1: `[Phase 3] [Navigation] Render 2D SVG Campus Floor Plans with Path Highlighting`
- **Labels**: `enhancement`, `map`, `ui`, `phase-3`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  Navigation currently only returns text-based turn-by-turn directions. Visitors and students struggle to visualize floor layouts without an interactive map.

  ### Proposed Solution
  1. Create 2D SVG floor plan layouts for Ground Floor (0), First Floor (1), and Second Floor (2).
  2. When `find_path` is called, highlight the path nodes and connecting corridors dynamically on the SVG floor plan.
  3. Display the interactive SVG alongside step-by-step directions in the chat UI.

  ### Acceptance Criteria
  - Route queries render an interactive floor plan with starting point, stairwell transitions, and destination marked.
  ```

---

### Issue 3.2: `[Phase 3] [Academic] Build Smart GPA/CGPA Target Calculator & Internal Marks Estimator Tool`
- **Labels**: `enhancement`, `agent-tools`, `phase-3`
- **Priority**: 🟡 Medium
- **Description**:
  ```markdown
  ### Problem Description
  Students frequently ask: *"What marks do I need in IAT 2 and Model Exam to get an O/A+ grade?"* or *"What is my target GPA to reach 8.5 CGPA?"*.

  ### Proposed Solution
  1. Create a dedicated calculation tool `calculate_target_marks(reg_no, course_code, target_grade)`.
  2. Fetch existing IAT scores from `student_assessments`, apply Anna University internal-to-external weightage (40/60 or 20/80 depending on regulation), and return required scores.
  3. Expose tool in `services/agent_tools.py`.

  ### Acceptance Criteria
  - Target grade queries return precise mark requirements for upcoming assessments.
  ```

---

### Issue 3.3: `[Phase 3] [Academic] Build Arrear Clearance Roadmap & Subject Prerequisite Planner Tool`
- **Labels**: `enhancement`, `academic`, `phase-3`
- **Priority**: 🟡 Medium
- **Description**:
  ```markdown
  ### Problem Description
  Students with standing arrears need a structured roadmap mapping which arrears to clear first based on prerequisite chains and upcoming exam timetable schedules.

  ### Proposed Solution
  1. Create tool `get_arrear_roadmap(reg_no)` querying `student_assessments` where `is_arrear = 1`.
  2. Cross-reference regulation rules on prerequisite courses and semester exam schedules.
  3. Synthesize a personalized clearance study plan.

  ### Acceptance Criteria
  - Students with arrears receive an actionable, semester-by-semester clearance plan.
  ```

---

# 📱 Phase 4: Multi-Surface Rollout (Web ➔ Mobile PWA ➔ Kiosk)

### Issue 4.1: `[Phase 4] [PWA] Convert Web Application to Installable Progressive Web App (PWA)`
- **Labels**: `enhancement`, `mobile`, `pwa`, `phase-4`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  Students and faculty need quick access from their home screen without opening browser tabs or remembering port numbers.

  ### Proposed Solution
  1. Add Web App Manifest (`manifest.json`) with app icons, theme colors, and standalone display mode.
  2. Implement a Service Worker for caching static frontend assets (CSS, JS, campus logos).
  3. Support "Add to Home Screen" prompt on Android/iOS.

  ### Acceptance Criteria
  - Web application is installable on mobile devices with standalone mobile framing.
  ```

---

### Issue 4.2: `[Phase 4] [Offline] Cache Indoor Campus Navigation Graph & Directions Offline in IndexedDB`
- **Labels**: `enhancement`, `offline`, `map`, `phase-4`
- **Priority**: 🟡 Medium
- **Description**:
  ```markdown
  ### Problem Description
  Indoor corridors and basements on campus often have dead zones with poor mobile data reception.

  ### Proposed Solution
  1. Cache `college_graph.json` and client-side Dijkstra algorithm locally in browser IndexedDB/LocalStorage.
  2. Allow the navigation interface to resolve rooms and compute turn-by-turn walking routes even when offline.

  ### Acceptance Criteria
  - Campus room search and route finding works 100% offline without active internet connection.
  ```

---

### Issue 4.3: `[Phase 4] [Kiosk] Build Fullscreen Kiosk Mode with Large Touch Targets & Voice-First Kiosk UI`
- **Labels**: `enhancement`, `kiosk`, `hardware`, `phase-4`
- **Priority**: 🟠 High
- **Description**:
  ```markdown
  ### Problem Description
  Physical touchscreen terminals placed at the college entrance lobby and central library require a kiosk-friendly interface with large touch targets, auto-reset timers, and voice-activated assistance.

  ### Proposed Solution
  1. Implement a Kiosk mode (`?mode=kiosk`) with fullscreen layout, high-contrast touch cards (e.g. "Campus Map", "Admissions", "Departments", "7.5% Quota Info").
  2. Prominent floating microphone button with automatic speech listening.
  3. Auto-reset inactivity timer (clears conversation history after 90 seconds of idle time).

  ### Acceptance Criteria
  - Kiosk view runs seamlessly on 1080p/4K touch displays with auto-reset and touch navigation.
  ```

---

### Issue 4.4: `[Phase 4] [Telemetry] Add Privacy-Preserving Campus Kiosk Analytics & Frequent Query Dashboard`
- **Labels**: `enhancement`, `analytics`, `admin`, `phase-4`
- **Priority**: 🟢 Low
- **Description**:
  ```markdown
  ### Problem Description
  College administrators need insights on the most frequently asked student/visitor questions, peak usage hours, and unanswerable queries to improve institutional data.

  ### Proposed Solution
  1. Log anonymized query topics, tool frequencies (SQL vs Vector vs Map), and language distributions in a local SQLite analytics table.
  2. Create an administrative dashboard view displaying top queried locations, frequently asked regulation topics, and system latency metrics.

  ### Acceptance Criteria
  - Admin view displays query trends without logging student personal identifiers or raw confidential chats.
  ```
