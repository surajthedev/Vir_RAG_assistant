# Implementation Plan: COLLEGE AI - Smart Campus Assistant

Build a production-quality, highly polished frontend-only web application called **"COLLEGE AI - Smart Campus Assistant"**. The application serves as an intelligent digital front desk for a college campus (P.T. Lee Chengalvaraya Naicker College of Engineering and Technology), featuring a conversational AI assistant, voice recognition input, speech synthesis narration, multi-step interactive campus navigation with animated vector mapping, interactive FAQ accordion, and quick exploratory cards.

## User Review Required

> [!IMPORTANT]
> - **Frontend-Only Architecture**: No backend, database, or document upload interfaces will be exposed. All responses use a modular mock AI service (`aiService.ts`) designed for instant replacement with `fetch("/api/chat")` in the future.
> - **Web Speech APIs**: Uses native browser `SpeechRecognition` (voice input) and `SpeechSynthesis` (auto/manual voice output) with graceful fallbacks for unsupported environments.
> - **Visual Identity**: Bright, modern, professional educational theme matching the required Royal Blue (`#2563EB`), Amber Yellow (`#F59E0B`), and Crimson Red (`#EF4444`) palette on clean Slate/White grounds.

---

## Proposed Architecture & File Structure

```
college-ai/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── chat.ts               # Message, Location, Route, FAQ, QuickQuestion types
    ├── services/
    │   ├── aiService.ts          # Intelligent mock AI matching engine (RAG API ready)
    │   └── speechService.ts      # Web Speech Recognition & SpeechSynthesis manager
    ├── data/
    │   ├── campusLocations.ts    # Buildings, nodes, coordinates, routes & walking times
    │   ├── faq.ts                # Categorized FAQs (College, Academics, Career, Campus, Events)
    │   ├── quickQuestions.ts     # Quick query chips with badges & icons
    │   └── mockResponses.ts      # Structured contextual responses & fallbacks
    └── components/
        ├── Header.tsx            # Sticky header with SVG logo, status badge, nav & mobile drawer
        ├── Logo.tsx              # Modern custom SVG campus AI emblem
        ├── Hero.tsx              # Welcome badge, headline, floating animated AI avatar
        ├── ChatWindow.tsx        # Main chat card with header, messages container, voice toggle
        ├── ChatMessage.tsx       # AI & user bubbles, speech controls, waveform, route card
        ├── ChatInput.tsx         # Input field, mic trigger, listening state, submit button
        ├── TypingIndicator.tsx   # "College AI is thinking..." with animated bouncing dots
        ├── VoiceVisualizer.tsx   # Dynamic animated multi-bar audio waveform
        ├── QuickQuestions.tsx    # Responsive grid of clickable prompt pills
        ├── FAQPanel.tsx          # Right-side accordion with search and instant chat integration
        ├── CampusMap.tsx         # Interactive SVG campus map with animated route, markers & directions
        ├── MapNavigation.tsx     # Step-by-step origin/destination selection flow inside chat
        ├── ExploreCollege.tsx    # 6 feature cards (Academics, Placements, Campus, Activities, etc.)
        ├── AboutCollege.tsx      # "Your College, One Intelligent Assistant" feature overview
        └── Footer.tsx            # Dark navy footer with college credentials & quick links
```

---

## Key Features & User Interaction Flow

### 1. Conversational Engine (`aiService.ts`)
- Intelligent intent extraction covering Departments, Admissions, Fees, Placements, Faculty, Library, Transport, Exams, Hostel, Canteen, and Campus Directions.
- Natural multi-step state machine for Campus Navigation:
  - Detects navigation request or clicking 📍 **Campus Map**
  - **Step 1**: Asks for current location with 8 instant selection chips
  - **Step 2**: Asks for destination with department/facility chips + search box
  - **Step 3**: Computes route, estimated walking time, distance, step-by-step turns, and renders the interactive `CampusMap` inside the conversation.
- Structured output formatting: Markdown support, bullet points, bold key stats, badge tags, and direct actionable suggestions.

### 2. Full Voice Experience (`speechService.ts`)
- **Voice Input (Speech-to-Text)**:
  - Click microphone icon in chat input
  - Visual listening status + animated soundwave equalizer
  - Automatically captures transcript and sends the question on speech end.
  - Browser fallback warning if `SpeechRecognition` is unavailable.
- **Voice Output (Text-to-Speech)**:
  - Global `Voice ON / Voice OFF` toggle saved in `localStorage` (default: ON).
  - Automatically speaks newly arrived AI responses.
  - Individual message voice controls: 🔊 Listen, Stop, Listen Again, and animated mini waveform.

### 3. Rich Campus Map & Route Visualizer (`CampusMap.tsx`)
- High-fidelity interactive SVG layout of the college campus with styled department blocks, roads, green areas, sports grounds, and landmark labels.
- Animated dashed path showing the exact walking route between origin and destination.
- Start pin (Emerald Green), Destination pin (Crimson Red), and intermediate waypoint indicators.
- Turn-by-turn walking steps and ETA metrics (e.g., "240 meters • 3 min walk").

### 4. Interactive FAQs & Explore Sections
- Clicking any FAQ item or Explore Card immediately fills the chat, scrolls the view smoothly to the conversation, displays the response, and reads it aloud if voice is enabled.

---

## Verification Plan

### Automated Build & Lint Verification
1. `npm run build` to ensure 0 TypeScript compilation errors and clean asset bundling.
2. Verify package dependencies and bundle size.

### Interactive Browser Verification
1. Launch local Vite development server.
2. Verify full UI rendering in Chrome/Edge across multiple viewports:
   - Desktop (1440px / 1024px)
   - Tablet (768px)
   - Mobile (375px / 425px)
3. Test all interactive flows:
   - Type a question -> receive structured AI response -> test SpeechSynthesis audio.
   - Click microphone -> test voice input listening visualization.
   - Click "📍 Campus Map" quick chip -> select "Main Gate" -> select "IT Department" -> verify route map rendering, ETA calculation, and speech narration.
   - Click FAQ items from all categories -> verify chat integration and accordion state.
   - Click each of the 6 "Explore Your College" cards -> verify instant question dispatch.
   - Toggle Voice ON/OFF switch -> verify persistence in `localStorage`.
   - Test mobile hamburger menu open/close and navigation anchors.
