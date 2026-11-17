# Champions League 2026 — KMEC × NGIT Inter-College Strategy Tournament
## Swiss International Style Design System

> **Theme:** *Learn • Build • Compete with AI*  
> **Organizers:** Department of Computer Science and Engineering (AI & ML), Keshav Memorial Engineering College (KMEC) in collaboration with Neil Gogte Institute of Technology (NGIT).  
> **Tournament Date:** Saturday, 21 November 2026 • 09:30 AM IST  
> **Venue:** KMEC Campus, Hyderabad (Auditorium & PS Rooms)

---

## 🏛️ Design Philosophy: Swiss International Style

The Champions League 2026 website follows the principles of **Swiss International Style (Die Neue Graphik)**:
- **Architectural Clarity & Grid Discipline**: Precise alignments, generous negative space, and disciplined layout hierarchies replace heavy shadows and tactile ornamentation.
- **Predominantly Near-White Surfaces**: Clean `#FBFCFD` background paired with pure white (`#FFFFFF`) card surfaces and subtle `#F8FAFC` contrast fills.
- **Typographic Authority**: Neutral, timeless Helvetica Neue system font stack with disciplined weights, strict scale hierarchy, and tabular monospace numerals for tournament telemetry and counters.
- **Structural Accents**: Precision `2px solid var(--navy)` top borders on content surfaces that transition to cyan on hover, replacing glossy gradients and 3D skewing.
- **Restrained Interaction Feedback**: Purposeful ~200ms transitions for button states, active indicators, and section navigation without spring physics or distracting movement.
- **WCAG AA Compliance**: High contrast ratios across all critical text, buttons, and form inputs.

---

## 🎨 Brand Colour Palette

| Element | Role | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Navy** | Dominant Brand | `#0C2343` | Typography, structural borders, primary buttons, hero headline |
| **Near-White** | Canvas Background | `#FBFCFD` | Main website background, input surfaces, subtle contrasts |
| **Pure White** | Card Surfaces | `#FFFFFF` | Content containers, modal dialogs, drawer panel |
| **Deep Teal** | Secondary Accent | `#238192` | Subheadings, status badges, secondary emphasis |
| **Cyan** | Interactive Accent | `#36BBD9` | Active indicators, glider lines, focus rings, interactive states |
| **Sky Blue** | Decorative Tone | `#70BEE3` | Subtle architectural and background highlights |
| **Divider Grey** | Structural Grid | `#E5E7EB` | Precision 1px container borders and dividers |

---

## 📐 Application Architecture & Features

1. **Sticky Header & Precision Navigation**:
   - Clean near-white header with 1px bottom divider and unembellished official logo presentation.
   - Smooth active indicator glider tracking section scroll positions.
   - Live registered squad badge (`14 / 32 Squads`) and responsive mobile menu.

2. **Editorial Hero Section**:
   - Two-column desktop grid pairing an oversized architectural title with the Learn • Build • Compete with AI interactive phase switcher.
   - Information narrative panel featuring Hyderabad location badge, tournament brief, and a 2×2 quick-facts grid.

3. **Live Tournament Radar / Quick Statistics**:
   - **Countdown Clock**: Live days/hours/minutes/seconds countdown with an alternate total-hours toggle and live IST clock.
   - **32-Team Cap Radar**: Dynamic progress gauge, live enrolled count, and cross-campus filter chips for KMEC and NGIT squads.
   - **Interactive Eligibility Checker**: Interactive chips for College, Branch, and Year with automatic registration form pre-filling.

4. **Side-Scroll Tournament Intelligence**:
   - 6-tab horizontal carousel featuring:
     1. *Tournament Dossier*: Rules, permitted AI code assistants (Claude, Gemini CLI, Cursor), deterministic engine refereeing.
     2. *Dual-Campus Matrix*: Collaboration between KMEC and NGIT.
     3. *Engine & Tech Stack*: Standalone execution, Python SDK, response tick budget.
     4. *Arenas & Venues*: Knockout Stadium (Auditorium) and Development Arenas (PS Rooms).
     5. *Honors & Accolades*: Trophy, medals, cash award, and participation certificates.
     6. *Interactive 32-Team Knockout Bracket*: Multi-round bracket (R32, Sweet 16, Quarters, Semis, Final) with interactive match inspection and live engine telemetry simulation.

5. **4-Step Registration Form Wizard**:
   - Step 1: Team handle, college selection, squad size (3 vs 4 members), and AI tools.
   - Step 2: Team leader credentials (hall ticket, branch, year, email, WhatsApp).
   - Step 3: Squad member details with dynamic 4th-member block.
   - Step 4: Live squad declaration summary and fair-play checkbox agreement.
   - Real-time inline field validation with accessible error messaging.

6. **Digital Squad Pass / Ticket Modal**:
   - Generates an official team entry pass with unique ID (e.g., `CL26-KMEC-8941`), dynamic QR code, and print/copy utilities.

7. **Registered Squads Slide-Out Drawer**:
   - Slide-out roster panel with live search and filtering by campus (KMEC / NGIT) and department (CSE / CSM).

8. **Directives & FAQ Accordion**:
   - Clean collapsible accordion addressing bot timeouts, AI assistant policies, equipment requirements, and tiebreaker criteria.

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge).
2. Zero build steps, package managers, or server requirements.
