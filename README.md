# Portfolio-1

My personal portfolio site. Built it to have something clean to show recruiters and put all my work in one place.

## What is this?

A single-page portfolio website with sections for about me, skills, projects, and contact info. It has a dark/light mode switch, a mobile-friendly hamburger menu, and you can filter skills by category. Everything animates in as you scroll down.

I kept it simple on purpose — no React, no frameworks, just HTML/CSS/JS. Wanted to get the fundamentals solid before overengineering things.

## Tech

- HTML5 (semantic tags — `<header>`, `<section>`, `<footer>`, etc.)
- CSS3 (custom properties, grid, flexbox, media queries for responsive)
- Vanilla JavaScript (DOM manipulation, localStorage for theme, IntersectionObserver for scroll animations)
- Google Fonts (Inter + JetBrains Mono)

No npm, no build step, no dependencies.

## Running it locally

```bash
git clone https://github.com/Piyushsingh1212/Portfolio-1.git
cd Portfolio-1
```

Then just open `index.html` in your browser. That's literally it.

If you want live reload while editing, use the Live Server extension in VS Code — right-click `index.html` → "Open with Live Server".

## File structure

```
index.html   → all the markup
style.css    → styling + responsive breakpoints + dark/light themes
script.js    → nav toggle, theme switch, skill filters, scroll animations
```

## Contact

Piyush Kumar Singh — piyushsingh3199@gmail.com
