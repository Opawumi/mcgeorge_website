## McGeorge Design Tokens & Utilities

This project defines a small design system using CSS custom properties and utility classes. Use these tokens and utilities to keep typography, spacing, colors, and buttons consistent.

### Files

- **`css/variables.css`**: Design tokens (colors, typography, radii, spacing, strokes) with responsive overrides.
- **`css/utilities.css`**: Reusable utility classes for typography and buttons.
- **`style-guide.html`**: Visual reference page that shows all core text styles and button variants.

### 1. Using design tokens (`variables.css`)

All tokens are defined on `:root`, so you can use them anywhere in your own CSS:

```css
.card {
  background: var(--white);
  color: var(--neutral-900);
  border-radius: var(--radius-4);
  padding: var(--spacing-6);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-600);
  color: var(--primary);
}
```

Key token groups:

- **Colors**
  - Primary: `--primary`, `--primary-100` … `--primary-900`
  - Secondary: `--secondary`, `--secondary-100` … `--secondary-900`
  - Base: `--white`, `--black`, `--dark-surface`, `--border`
  - Neutrals: `--neutral-100` … `--neutral-900`
- **Typography**
  - Headings: `--text-h1` … `--text-h6`
  - Body: `--text-xlarge`, `--text-large`, `--text-regular`, `--text-small`
  - Buttons: `--text-btn-primary`, `--text-btn-secondary`, `--text-btn-small`
  - Labels/forms: `--text-label`, `--text-input`, `--text-helper`, `--text-error`
  - Other: `--text-caption`, `--text-microcopy`, `--text-overline`, `--text-quote`, `--text-citation`
- **Radii**: `--radius-1` … `--radius-6`
- **Strokes**: `--stroke-0`, `--stroke-00`, `--stroke-1`, `--stroke-2`, `--stroke-3`
- **Spacing**: `--spacing-1` … `--spacing-13`

Tablet and desktop media queries in `variables.css` adjust many of these values automatically; you normally do not need device-specific overrides in components.

### 2. Typography utilities (`utilities.css`)

These classes are the recommended way to apply standard text styles in markup.

**Headings**

- `.text-h1`, `.text-h2`, `.text-h3`, `.text-h4`, `.text-h5`, `.text-h6`

```html
<h1 class="text-h1 text-primary">Page title</h1>
<h2 class="text-h2">Section heading</h2>
```

**Body text**

- `.text-body-xl`, `.text-body-lg`, `.text-body`, `.text-body-sm`

```html
<p class="text-body">
  This is the standard body copy. It adapts via the typography tokens per breakpoint.
</p>
```

**Supporting text**

- `.text-caption`, `.text-overline`, `.text-quote`, `.text-citation`

```html
<p class="text-overline">Overline label</p>
<p class="text-caption">Caption text below an image.</p>
```

**Font weight helpers**

- `.font-regular`, `.font-medium`, `.font-semibold`, `.font-bold`

```html
<span class="text-body font-bold">Emphasised text</span>
```

**Text color helpers**

- `.text-primary`, `.text-secondary`, `.text-neutral`, `.text-white`, `.text-black`

```html
<p class="text-body text-neutral">Muted description text.</p>
```

### 3. Button utilities (`utilities.css`)

Use the base `.btn` class, then combine with a variant and size class.

**Base**

- `.btn` – layout, padding, radius, border, typography, transitions.

**Variants**

- `.btn-primary` – solid primary background, white text.
- `.btn-secondary` – light secondary background, primary text.
- `.btn-ghost` – transparent background, subtle hover.
- `.btn-white` – solid white background, primary text, no border.
- `.btn-primary-outline` – transparent with primary border and text.
- `.btn-white-outline` – transparent with white border and text (for dark/primary backgrounds).

**Sizes**

- `.btn-sm` – compact
- `.btn-md` – default
- `.btn-lg` – large/hero

```html
<!-- Primary CTA -->
<button class="btn btn-primary btn-md">Primary action</button>

<!-- Secondary on light background -->
<button class="btn btn-secondary btn-sm">Secondary</button>

<!-- White CTA for colored header -->
<button class="btn btn-white btn-lg">Get started</button>

<!-- Outline on light background -->
<button class="btn btn-primary-outline btn-md">Outline</button>

<!-- White outline on dark background -->
<div style="background: var(--dark-surface); padding: 16px; border-radius: var(--radius-3);">
  <button class="btn btn-white-outline btn-md">Contact us</button>
</div>
```

### 4. Style guide page

Open `style-guide.html` in a browser to see:

- All typography utilities rendered with labels and corresponding token names.
- All button variants and sizes, including disabled states.

Use this page while tweaking design tokens or utilities so you can quickly verify how global changes affect the system.