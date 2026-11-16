# Champions League 2026 — KMEC × NGIT Frontend

> **Theme:** *Learn • Build • Compete with AI*  
> **Organizers:** Department of Computer Science and Engineering (AI & ML), Keshav Memorial Engineering College (KMEC) in collaboration with Neil Gogte Institute of Technology (NGIT).  
> **Tournament Date:** 21 November 2026 (Saturday)

---

## 🎨 Color Palette (Sampled Directly from the Logo)

The entire design system is built strictly from the colors of the official **Champions League 2026** logo:

| Color Role | Hex Code | RGB | Description |
| :--- | :--- | :--- | :--- |
| **Deep Midnight Navy (Background)** | `#062341` | `rgb(6, 35, 65)` | Primary canvas background sampled directly from the logo canvas. |
| **Abyssal Base (Contrast)** | `#031326` | `rgb(3, 19, 38)` | High-contrast background for terminal, modals, and deep cards. |
| **Electric Cyan (Primary Accent)** | `#32BEDF` | `rgb(50, 190, 223)` | Extracted from the angular "CL" emblem arrow; used for CTAs, glow halos, and active states. |
| **Deep Sea Teal (Secondary Accent)**| `#1C8392` | `rgb(28, 131, 146)` | Sourced from the logo's inner triangular wing; used for badges and secondary highlights. |
| **Crisp Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Matches the bold "CHAMPIONS LEAGUE" & "CL" typography. |
| **Powder Ice Blue** | `#7DD3FC` | `rgb(125, 211, 252)` | Extracted from the "2026" subtitle text. |

---

## ⚡ Non-Linear Bento Architecture & Transitions

1. **Clean, Minimalist Atmosphere (No Grid Lines)**
   - Grid overlay removed for a clean, sleek, pure midnight backdrop with dynamic organic radial aura and floating particles.
2. **Scroll-Linked Animations & Micro-Interactions**
   - Top scroll progress indicator bar in electric cyan.
   - Smooth `IntersectionObserver` scroll reveals (`.scroll-reveal`, `.scroll-reveal-left`, `.scroll-reveal-right`, `.scroll-reveal-scale`, staggered delays) animating every part of the page as the user explores.
3. **Non-Linear Bento Grid & War Room Hub**
   - **War Room**: Asymmetric hero layout pairing the tournament identity & theme alongside live countdown and 32-slot radar gauge.
   - **KMEC × NGIT Dual Campus Matrix**: Highlighted partnership between Keshav Memorial Engineering College and Neil Gogte Institute of Technology.
   - **Autonomous Rules Directives**: Clarifying AI builder permissions and automated engine scoring.
   - **Tournament Arenas & Venues**: KMEC Auditorium (Knockout Stadium) and PS Rooms (Dev Lab).
   - **Championship Accolades**: Winner Trophy, Gold/Silver Medals, Cash Award, and Badges.
   - **Single-Elimination Knockout Arena**: Interactive 32-team bracket viewer (R32, Sweet 16, Quarterfinals, Semifinals, Grand Final).
4. **Registration Wizard Terminal**
   - 4-step interactive flow with instant validation, KMEC vs NGIT selector, dynamic 4th member toggle, review summary, and digital pass generation with dynamic QR code on canvas.

---

## 🚀 How to Run

1. Open `index.html` directly in your browser.
2. Zero build steps, package managers, or external dependencies required.
