# Brand Assets

## Approved identity

MG Architect is the approved faithful vector reconstruction of Matt Ghoreishi's monogram. The supplied vector paths are the source of truth and must not be redrawn or optimized in a way that changes their geometry.

## Canonical assets

- Canonical source: `public/assets/brand/source/MG_Architect_Final_B_Canonical.svg`
- Navigation: `public/assets/brand/mg-architect.svg`
- Monochrome fallback: `public/assets/brand/mg-architect-white.svg`
- Favicon master: `public/icon.svg`
- ICO fallback: `public/favicon.ico`
- Apple touch icon: `public/apple-touch-icon.png`

The root metadata declares the SVG favicon, ICO fallback, and Apple touch icon exactly once. Public locations remain in use because the current Cloudflare Pages adapter cannot emit the Next.js `favicon.ico` and `apple-icon.png` metadata routes together.

## Approved colors

- Structural M: `#63E6F4`
- Open G: `#F8FAFC`
- Favicon background: `#06111F`
- Favicon border: `#2C6572`

## Approved placements

- Top-left global navigation
- Browser favicon system
- Apple touch icon

## Prohibited treatments

- Homepage hero, footer, portrait, article cards, Work cards, product UI, backgrounds, headings, loading states, or Open Graph images
- Animation, glow, shadow, rotation, 3D rendering, gradients, corner rounding, or color swapping
- Changing the G opening, M proportions, path geometry, aspect ratio, or container relationship

## Accessibility

The navigation image is decorative and hidden from assistive technology. Its enclosing home link retains the accessible name `Matt Ghoreishi home`, avoiding duplicate announcements. Browser and touch icons add no page-level announcement.

## Rollback

The previous production MG identity remains preserved in Git history at commit `f28a8a0688e36aa1d85232fbdadc2c01db772a83`. Reverting the eventual Architect identity merge restores that state.
