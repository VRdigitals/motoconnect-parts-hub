# Mobile Responsiveness Plan

Improve the website's mobile friendliness by addressing layout constraints (like fixed 16:9 aspect ratios) and enhancing mobile-specific UI elements.

## User Review Required

- No specific review required, but I will be adjusting layout ratios on mobile to ensure content isn't cut off.

## Proposed Changes

### Global Styles (`src/styles.css`)
- Add mobile-specific utility classes if needed, though standard Tailwind will be prioritized.

### Home Page (`src/routes/index.tsx`)
- **Hero Section**: Change `aspect-video` to `aspect-[9/16]` or `min-h-[80vh]` on mobile to ensure the video/image background covers the screen comfortably.
- **Typography**: Scale down the `font-podium` headings further for small screens to prevent text overflow.
- **Navigation**: Ensure the mobile menu overlay is functional and covers all essential links.
- **Brands Section**: Adjust grid columns for mobile (2 columns) vs tablet (3-4 columns).
- **Footer**: Ensure columns stack correctly and map remains usable.

### About Page (`src/routes/about.tsx`)
- **Hero**: Adjust aspect ratio for mobile.
- **Stats**: Ensure 2x2 grid on mobile is well-spaced.
- **Layout**: Stacking components vertically with proper padding.

### Brand Portfolio Page (`src/routes/products.tsx`)
- **Grid**: Refine the logo grid to be 2 columns on mobile.
- **Hero**: Adjust spacing and typography.

### Contact Page (`src/routes/contact.tsx`)
- **Form**: Ensure the glass-morphism form fills the width on mobile.
- **Layout**: Stack contact details and form.

## Technical Details

- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) extensively.
- Implement `overflow-x-hidden` on the root container to prevent accidental horizontal scrolling.
- Optimize touch targets for buttons and navigation links.
- Adjust `aspect-video` constraint which is currently forcing a desktop ratio on mobile devices, causing cropping or massive black bars.
