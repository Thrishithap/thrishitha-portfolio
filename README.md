<div align="center">

# Thrishitha Perabathula

**Junior Software Engineer &bull; Distributed Systems &bull; High-Scale Backend &bull; AI/Deep Learning**

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  A high-performance, responsive portfolio showcasing production microservices, B2B telecom workflows, and published explainable AI research.
</p>

[Live Demo](#run-locally) • [Architecture](#-architecture--directory-structure) • [Tech Stack](#-technical-stack) • [Quick Start](#-getting-started) • [Deployment](#-deployment)

---

</div>

## Overview

This repository houses the personal portfolio and software engineering showcase for **Thrishitha Perabathula**. Designed with a modern cyber-glass aesthetic, aurora gradients, and interactive micro-animations, it highlights real-world production engineering, distributed microservices integration, and published academic research.

### Core Highlights

- **B2B Telecom Engineering**: Backend development supporting 8+ microservices, REST & GraphQL integrations, role-based access control (RBAC), and caching strategies.
- **Published AI Research**: Explainable deep learning pipeline for intracranial hemorrhage detection using SE-ResNet50 & Grad-CAM visual heatmaps (98.84% accuracy, published in IEEE).
- **Engineering Aesthetics**: Particle field background, magnetic physics cursor, perspective card tilts, smooth carousel slider, and accessible responsive layouts.

---

## Architecture & Directory Structure

```text
thrishitha-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated CI/CD deployment to GitHub Pages
├── .vscode/
│   ├── extensions.json         # Recommended developer extensions for VS Code
│   └── settings.json           # Formatter and whitespace configuration
├── assets/
│   ├── archive/                # Safely archived alternative portraits & test assets
│   ├── favicon.svg             # Monogram SVG brand favicon
│   ├── Thrishi.png             # Primary hero portrait
│   ├── Thrishi123.png          # Sticker badge avatar
│   └── Thrishitha.png          # Alternate about portrait
├── css/
│   └── style.css               # Modular design system, glass tokens & keyframe animations
├── dist/                       # Minified production build output (Vite)
├── js/
│   └── main.js                 # ES module logic, particle engine & UI interactions
├── .editorconfig               # Cross-IDE indentation & formatting standards
├── .gitignore                  # Production Git ignore patterns
├── index.html                  # Semantic HTML5 entrypoint with SEO & OpenGraph tags
├── package.json                # Project configuration, metadata & npm scripts
├── README.md                   # Repository documentation & engineering guide
└── vite.config.js              # Modern Vite bundler & server configuration
```

---

## Technical Stack

| Category | Technologies & Tools |
| :--- | :--- |
| **Core** | Semantic HTML5, ES6+ JavaScript (ES Modules), Vanilla CSS3 |
| **Tooling & Bundler** | [Vite](https://vitejs.dev/) (Lightning-fast HMR & ES module tree-shaking) |
| **Styling Architecture** | Custom Glassmorphism System, HSL Color Scales, CSS Grid & Flexbox |
| **Icons & Typography** | [Font Awesome 6.5](https://fontawesome.com/), Google Fonts (Outfit, Inter, Space Grotesk) |
| **CI/CD** | GitHub Actions (`deploy.yml`) for automated builds & GitHub Pages |

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended) installed on your machine.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Thrishithap/thrishitha-portfolio.git
cd thrishitha-portfolio
npm install
```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be served at `http://localhost:5173/`.

### Production Build

Compile and minify assets into the `dist/` directory:

```bash
npm run build
```

### Local Production Preview

Preview the production build locally:

```bash
npm run preview
```

---

## Engineering Features

1. **Modular Script Architecture**: Scripts load natively via `<script type="module" src="js/main.js"></script>`, enabling modern JavaScript scoping and automated asset hashing.
2. **Zero-Dependency Lightweight Canvas**: Canvas particle animation written in vanilla JavaScript without heavy external animation libraries.
3. **Accessibility & Reduced Motion**: Automatically respects `prefers-reduced-motion: reduce` for smooth accessibility across all devices.
4. **Clean Asset Segregation**: Active production media is isolated from historical drafts in `assets/archive/`.

---

## Deployment

### GitHub Pages (Automated)

The included `.github/workflows/deploy.yml` workflow triggers automatically on pushes to the `main` branch. To enable:
1. Navigate to **Settings > Pages** in your GitHub repository.
2. Set **Source** to **GitHub Actions**.


---

## Author & Connect

- **Thrishitha Perabathula**
- **Email**: [thrishitha26@gmail.com](mailto:thrishitha26@gmail.com)
- **LinkedIn**: [linkedin.com/in/thrishitha-perabathula-bb0427259](https://www.linkedin.com/in/thrishitha-perabathula-bb0427259)
- **GitHub**: [github.com/Thrishithap](https://github.com/Thrishithap)
- **LeetCode**: [leetcode.com/u/thrishitha26/](https://leetcode.com/u/thrishitha26/)

---

## License

This project is open-source and available under the [MIT License](LICENSE).
