# Brand Assets

## Canonical assets

The approved MG Brand Asset Pack is the source for all monogram and favicon files. Repository copies are used verbatim:

- Navigation: `public/assets/brand/mg-monogram.svg`
- Monochrome: `public/assets/brand/mg-monogram-white.svg`
- Browser icon: `public/icon.svg`, using the rounded-square favicon artwork
- Browser fallback: `public/favicon.ico`
- Apple touch icon: `public/apple-touch-icon.png`

The root metadata declares these three files exactly once. Public locations are used because the current Cloudflare Pages build adapter cannot emit the Next.js `favicon.ico` and `apple-icon.png` metadata routes together.

The review preview and unused raster source sizes do not ship as duplicate public assets.

## Approved colors

- Deep background: `#050914`
- Favicon background: `#06111F`
- Cyan: `#78E6F4`
- Soft cyan: `#A5F3FC`
- Border: `#2C6572`
- White: `#F8FAFC`

## Allowed placements

- Top-left navigation
- Browser favicon system
- Apple touch icon
- A restrained future footer signature
- A small future Open Graph signature

## Prohibited treatments

- Giant homepage logo or repeated section watermark
- Animation, glow effects, rotation, 3D rendering, or arbitrary gradients
- Placement over Matt's portrait or inside every article/project card
- Modifying the letter geometry

## Accessibility

The navigation mark is decorative because the enclosing home link has the accessible name `Matt Ghoreishi home`. Favicon and touch-icon artwork is non-textual browser chrome and does not add page-level announcements.
