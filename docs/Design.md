# Brand Design System - ICON Estate & Property Managers

## 1. Brand Palette & Design Tokens

```css
:root {
  /* Brand Core Colors */
  --color-primary-orange: #fd6f00;   /* Primary CTAs, active states, step badges, focus rings */
  --color-orange-hover: #e56300;     /* Hover state for primary buttons */
  --color-dark-green: #1f3c07;       /* Brand dark green, headings, footer background, primary buttons */
  --color-dark-green-hover: #162b05; /* Hover state for dark green elements */
  
  /* Neutral Color Tokens */
  --color-bg-light: #f7f8f5;         /* Light section background */
  --color-dark-text: #171717;        /* Body text color */
  --color-muted-gray: #6b7280;       /* Secondary body text & descriptions */
  --color-border: #e5e7eb;           /* Standard card & form border color */
  --color-white: #ffffff;            /* Card backgrounds, clean headers */

  /* Validation & Status Tokens */
  --color-error: #ef4444;            /* Accessible error border & text */
  --color-error-bg: #fef2f2;         /* Error alert background */
  --color-success: #10b981;          /* Accessible success border & text */
  --color-success-bg: #ecfdf5;       /* Success alert background */
  --shadow-focus: 0 0 0 3px rgba(253, 111, 0, 0.15); /* Orange accessibility focus ring */

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Poppins', sans-serif;

  /* Form & Radius Specifications */
  --radius-input: 8px;
  --radius-card: 16px;
  --radius-btn: 999px;
  --input-height: 52px;
}
```

---

## 2. Accessible Form UI & Security Alert States
1. **Focus State:** All input controls (`input`, `select`, `textarea`, `button`, `a`) display a 3px primary orange glow ring (`--shadow-focus`) upon keyboard or mouse focus without shifting element dimensions.
2. **Error State:** Input fields receiving invalid data display an error border (`#ef4444`), light red background (`#fef2f2`), and an error message below the field.
3. **Success State:** Form status alerts (`form-status-alert success`) display green borders and text on light green background (`#ecfdf5`).
4. **Honeypot Hidden Element:** Honeypot anti-spam fields use `display: none !important; opacity: 0; position: absolute; left: -9999px;` so they are completely hidden from human visitors but capturable by spam bots.
5. **No Visual Shift Security Alerts:** Form alerts use smooth opacity transitions and pre-reserved container space to prevent page layout jumps during validation.
