# D&A Web Studio — 3D Animated Official Agency Website

A high-performance, 3D animated agency website built for **D&A Web Studio**, featuring an interactive Three.js 3D background, 3D card tilts, founder showcases for **Dhruv Sahani** and **Amisha Kadve**, complete agency services suite, interactive project scope & cost estimator, case studies portfolio, scratch-to-reveal playground, and direct client proposal system.

---

## 🌟 Key Features

1. **Three.js 3D WebGL Background (`js/three-scene.js`)**
   - Interactive 3D particle constellation with mouse parallax and scroll response.
   - Central geometric wireframe icosahedron and glowing digital core.
   - Smooth 60 FPS performance optimization and responsive resize handling.

2. **Founders Showcase (Dhruv & Amisha)**
   - Dedicated spotlight profiles for both co-founders.
   - High-res portrait cards, philosophy points, skill badges, and direct mail contact.

3. **Agency Services Suite**
   - 3D interactive tilt cards for all 6 core agency offerings:
     - 🌐 3D & Interactive Web Development
     - 📈 Digital Growth & CRO Strategy
     - 💬 Chat Support & CX Automation
     - 🎧 Dedicated Customer Support Operations
     - 🔍 Data Review & Quality Assurance
     - 🏷️ Data Annotation & AI Labeling
   - Interactive deep-dive modal viewer for deliverables and tech stacks.

4. **Interactive Project Cost & Scope Estimator**
   - Live real-time budget and timeline calculator.
   - Service selection, page scope tier, and optional add-ons.
   - "Apply Estimate" button transfers selections directly to the inquiry form.

5. **Interactive Scratch & Win Playground**
   - Metallic sage scratch card canvas with mouse & touch erasing.
   - Triggers celebratory confetti burst and complimentary voucher upon scratch.

6. **Interactive Comparison ("Why Choose D&A")**
   - Transparent side-by-side comparison of standard template agencies vs. D&A Web Studio.

7. **Dark / Light Glassmorphic Theme**
   - Persistent theme switcher stored in `localStorage`.
   - Subtle neon accents (`#93ab88` sage, `#10b981` emerald, `#38bdf8` electric cyan).

8. **Zero-Friction Customization (`js/data.js`)**
   - All agency data, founder bios, services, case studies, prices, testimonials, and FAQs are cleanly centralized in `js/data.js`.

---

## 📁 Project Structure

```
da-web-studio/
├── index.html          # Semantic HTML5 layout with WebGL canvas and structured sections
├── css/
│   └── styles.css      # Glassmorphism, 3D tilt effects, custom cursor, theme styles
├── js/
│   ├── data.js         # Central data configuration (Founders, Services, Estimator, FAQs)
│   ├── three-scene.js  # Three.js 3D WebGL background and geometry animations
│   └── main.js         # Interactivity, tilt physics, modals, estimator, form handler
├── assets/             # Images (dhruv.jpg, amisha.jpg, favicon.svg, etc.)
└── README.md           # Documentation
```

---

## 🚀 How to Run & Preview Locally

You can open `index.html` directly in any web browser, or launch a local static server:

### Option 1: Direct Open
Double click `index.html` or open it with Google Chrome, Microsoft Edge, or Firefox.

### Option 2: PowerShell Simple HTTP Server
```powershell
# Open terminal in project directory
cd "C:\Users\Dhruv Sahani\.gemini\antigravity\scratch\da-web-studio"
# Start Python HTTP server if installed, or use Live Server in VS Code
```

---

## ✏️ How to Edit Content

To update founder information, add new services, change prices in the estimator, or add new case studies, simply open:
👉 [`js/data.js`](js/data.js)

All changes will immediately reflect on the website without modifying the HTML markup!