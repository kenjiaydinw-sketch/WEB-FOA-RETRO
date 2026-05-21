# Festival of Agroindustry (FoA) 2026 - Retro Arcade Premium

![FoA 2026 Hero](https://via.placeholder.com/1920x1080?text=FoA+2026)

Welcome to the official repository for the **Festival of Agroindustry (FoA) 2026** landing page! 

FoA 2026 is envisioned as the largest arcade gaming competition, bringing together classic gaming enthusiasts for an unforgettable experience with an authentic retro atmosphere. This landing page serves as the digital front door for the event, providing information on competition categories, participant benefits, the event timeline, and showcasing past champions in the Hall of Fame.

## 🌟 Features

This landing page is designed to be modern, responsive, and interactive, featuring:

*   **Retro Arcade Aesthetic:** A dark theme with vibrant neon accents (gold, lemon, red, and blue) to mimic the classic arcade feel.
*   **Smooth Scroll Navigation:** A sticky navigation bar that smoothly glides to different sections of the page.
*   **Scroll Reveal Animations:** Elements gracefully fade and slide into view as the user scrolls down the page. *The animation logic is designed to repeat, so elements will re-animate every time they enter the viewport.*
*   **Interactive Hall of Fame:** Clickable player cards that reveal detailed information about the champions with a stylish hover and active state effect.
*   **Automatic Language Detection (i18n):** The website automatically detects the user's browser language. 
    *   If the browser is set to Indonesian (`id`), the text will be displayed in **Bahasa Indonesia**.
    *   For all other languages, the site defaults to **English**.
*   **Fully Responsive:** Optimized for desktops, tablets, and mobile devices.

## 🚀 How to Run

This is a static website built with pure HTML, CSS, and JavaScript. No complex build tools or servers are required to view it.

1.  **Clone or Download** this repository to your local machine.
2.  Navigate to the root directory containing `index.html`.
3.  **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge).

*Alternatively, you can use a local development server like VS Code's "Live Server" extension for a better development experience.*

## 📁 Project Structure

```text
WEBFOA RETRO/
│
├── index.html           # The main and only HTML file containing all structure, styles, and scripts.
└── FoA2026RETRO/
    ├── README.md        # This documentation file.
    └── Logo/            # Directory containing project logos and image assets.
        ├── Logo FoA New 7 1.png
        ├── logo himalogin.png
        └── Logo IPB.png
```

## 🛠️ Built With

*   **HTML5:** Semantic structure.
*   **Vanilla CSS3:** Custom styling, CSS variables, CSS Grid/Flexbox, and animations (no external CSS frameworks).
*   **Vanilla JavaScript (ES6+):** For intersection observers (scroll animations), interactive cards, smooth scrolling, and client-side internationalization.

## 🌐 Internationalization (i18n)

The language system is managed directly within the `<script>` tag in `index.html`. It uses a dictionary object (`translations`) containing `en` (English) and `id` (Indonesian) keys. HTML elements that require translation use the `data-i18n` attribute to map to these keys.

To add or modify text, simply update the `translations` object in the script and ensure the corresponding HTML element has the correct `data-i18n="your_key"` attribute.

---
*&copy; 2026 Festival Of Agroindustry. All Rights Reserved | Made with ❤️*
timeline foa (iac), pendaftaran (1Juni-2Juli)-perngumpulan paper(4-21 Juli)-pengumuman finalis iac(25 Juli)-Finak iac(1 Agustus)
NAC , pendaftaran nac(22 Juni-23Juli)-pengumpulan paper nac (25 Juli-8 Agustus)-pengumuman finalis nac(15 Agustus)-final nac(30 Agustus)
NSAC, pendaftaran nsac (22 Juni-10 Agustus)-roadshow nsac(27 Juli-8 Agustus)-penyisihan nsac (15 Agustus)-finalnsac (30 Agustus)