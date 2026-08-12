# Plan: Create About Us and Contact Us Pages

Create two new high-impact, industrial-themed pages for "About Us" and "Contact Us" that align with the existing Motoconnect visual identity (Hero Red accents, Podium typography, glass-morphism, and dark aesthetic).

## User Review Required
> [!IMPORTANT]
> The "Contact Us" page already exists but will be refined to ensure it perfectly matches the new homepage style. The "About Us" page will be a new route.

- **Visual Style**: High-contrast dark theme, Hero Red (#ff0000) accents, "FSP DEMO - PODIUM Sharp 4.11" for headings, Raleway for body text.
- **Components to reuse**: `logoAsset`, `Footer`, and specific industrial styling from the homepage.

## Proposed Changes

### 1. About Us Page (`src/routes/about.tsx`)
- **Hero Section**: Full-screen 16:9 header with `about-bg-video.mp4` or a high-quality industrial background.
- **Mission & Vision**: Two-column layout with glass-morphism cards.
- **Company History**: Animated timeline or milestone grid.
- **Stats Section**: Animated counters for "10K+ Parts", "30+ Brands", etc. (consistent with homepage).
- **Team/Leadership**: Minimalist grid for key leadership roles (placeholders).
- **CTA**: "Get a Quote" or "View Brands" section at the bottom.

### 2. Contact Us Page (`src/routes/contact.tsx`)
- **Refinement**: Ensure the existing page uses the same logo container and typography as the homepage.
- **Hero**: Clean industrial header with "START A CONNECTION" title.
- **Contact Grid**:
    - **Left**: Modern glass-morphism contact form.
    - **Right**: Direct contact details (Hero Red cards) with icons.
- **Map**: Full-width interactive dark-themed Google Map.
- **Business Hours**: Structured schedule card.

### 3. Navigation Updates
- Ensure `src/routes/index.tsx` and all new pages link correctly to `/about` and `/contact`.

## Technical Details
- **Fonts**: Use `font-podium` and `font-raleway`.
- **Assets**: Utilize existing `about-vision.png`, `about-bg-new.png`, and `about-bg-video.mp4`.
- **Responsive**: Fully optimized for mobile with 16:9 aspect ratios where applicable.
