# Gautam Kumar — Cinematic Developer Portfolio

A highly immersive, performance-optimized 3D developer portfolio built with React, Three.js, and GSAP.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02.svg?style=flat&logo=greensock)](https://greensock.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R181-000000.svg?style=flat&logo=three.js)](https://threejs.org/)

## Overview

This repository contains the source code for my professional developer portfolio. Designed with a focus on immersive user experience, the application leverages cutting-edge web technologies to create a cinematic, interactive journey. It serves not only as a showcase of my projects and experience but also as a testament to my skills in frontend architecture, 3D rendering, animation choreography, and performance optimization.

## Live Demo

🌐 **[View Live Portfolio](https://gautamkumar.dev)**  
*(Note: Replace with your actual deployed URL)*

## Features

* **Immersive 3D Experiences:** Integrated custom 3D models and interactive environments using React Three Fiber and Spline.
* **Cinematic Animations:** High-performance, scroll-linked animations and page transitions choreographed with GSAP ScrollTrigger and Framer Motion.
* **Liquid Smooth Scrolling:** Integrated Lenis to hijack native scrolling for a buttery-smooth, hardware-accelerated scroll experience.
* **Dynamic Page Transitions:** Seamless route changes with AnimatePresence, preventing jarring layout shifts.
* **Responsive Editorial Layout:** A custom, magazine-style layout built with modern Tailwind CSS to ensure pixel-perfect rendering across mobile, tablet, and desktop devices.
* **Integrated Contact System:** Serverless contact form handling via EmailJS for secure and direct communication.

## Tech Stack

### Frontend & Core
* **React 19:** Component-based UI development
* **React Router v7:** Client-side routing

### 3D & Graphics
* **Three.js & React Three Fiber:** WebGL rendering and 3D canvas management
* **React Three Drei & Postprocessing:** Advanced camera controls, environment setups, and visual effects
* **@splinetool/react-spline:** Seamless integration of Spline 3D assets

### Animation & Physics
* **GSAP (GreenSock):** Complex timeline sequencing and ScrollTrigger for scroll-driven animations
* **Framer Motion:** Declarative animations and route transitions
* **Lenis:** Smooth scrolling library

### Styling
* **Tailwind CSS v4:** Utility-first styling with custom design tokens
* **clsx & tailwind-merge:** Dynamic class composition

### Build Tools & Development
* **Vite:** Next-generation frontend tooling for ultra-fast HMR and optimized builds
* **ESLint:** Code quality and formatting enforcement

## Project Architecture

The application is built on a modular, component-driven architecture. 
* **State Management:** React's native hooks (`useState`, `useContext`, `useRef`) are utilized for localized state, while animations rely on imperative refs bound to GSAP contexts.
* **Routing Strategy:** Lazy-loaded route components combined with `Suspense` and `AnimatePresence` to optimize initial bundle size while preserving smooth page transitions.
* **Animation Architecture:** Separation of concerns between structural CSS (Tailwind) and behavioral animations (GSAP/Framer). GSAP `context()` is heavily used for memory-safe animation cleanup on component unmounts.

## Folder Structure

```text
├── public/                 # Static assets (fonts, images, 3D models)
├── src/
│   ├── components/         # Reusable UI components (Preloader, Timeline, Navbar, SplineRobot)
│   ├── constants/          # Application data (projects, experiences, tech stack data)
│   ├── hooks/              # Custom React hooks (useLenis)
│   ├── pages/              # Route-level components (AllProjects)
│   ├── sections/           # Major page sections (Hero, About, Projects, Experience, Contact)
│   ├── App.jsx             # Main application layout and routing wrapper
│   ├── main.jsx            # React entry point and Lenis initialization
│   └── index.css           # Global styles, design tokens, and CSS variables
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite bundler configuration
└── README.md               # Project documentation
```

## Design Philosophy

The aesthetic vision centers around a **"Cinematic Editorial"** design language:
* **Typography:** High-contrast pairing of modern geometric sans-serif fonts for headlines, ensuring a strong visual hierarchy.
* **Space & Rhythm:** Generous use of negative space (`clamp()` functions for fluid typography and spacing) to create a premium, uncrowded feel.
* **Micro-interactions:** Every hover state, scroll event, and click is intentionally designed to provide subtle feedback without overwhelming the user.

## Performance Optimizations

Despite heavy use of animations and 3D rendering, the application maintains strict performance budgets:
* **Lazy Loading:** Below-the-fold sections and secondary pages are dynamically imported (`React.lazy`).
* **GPU Acceleration:** Animations are bound to `transform` and `opacity` properties to ensure they run on the compositor thread.
* **GSAP Contexts:** All GSAP animations are wrapped in `gsap.context()` for immediate garbage collection upon component destruction, preventing memory leaks.
* **Canvas Optimization:** Three.js canvases are optimized with proper pixel ratios, frustum culling, and efficient geometry management to maintain stable framerates.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your EmailJS credentials (if using the contact form):
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Available Scripts

* `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
* `npm run build`: Compiles and bundles the application into the `dist` directory for production.
* `npm run preview`: Bootstraps a local static web server to preview the production build.
* `npm run lint`: Runs ESLint to check for code quality and syntax issues.

## Deployment

This project is optimized for deployment on modern edge networks such as **Vercel** or **Netlify**.
The build command (`npm run build`) generates highly optimized static assets. Ensure that client-side routing fallback (URL rewriting to `index.html`) is configured properly on your hosting provider.

## Key Learnings

Building this portfolio reinforced several critical engineering concepts:
* **Advanced WebGL Integration:** Balancing high-fidelity 3D rendering with performance budgets using React Three Fiber.
* **Complex Animation Orchestration:** Syncing Framer Motion's declarative state-based animations with GSAP's imperative scroll-linked timelines.
* **Modern CSS Architectures:** Leveraging Tailwind CSS v4's new engine and CSS variables for a highly maintainable, theme-able design system.

## Future Improvements

* **CMS Integration:** Migrate project and experience data from static files to a headless CMS (e.g., Sanity or Strapi) for easier content updates.
* **WebGL Fallbacks:** Implement static image fallbacks for devices that do not support WebGL or have low-tier GPUs.
* **Accessibility Enhancements:** Deepen ARIA compliance across complex custom interactive components.

## Author

**Gautam Kumar**  
Full-Stack Software Engineer  
* [GitHub](https://github.com/yourusername)  
* [LinkedIn](https://linkedin.com/in/yourusername)  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
