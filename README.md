# flu-harness-landing

The landing page for [flu-harness](https://github.com/Jujubalandia/flu-harness).

**Live at <https://flu-harness.netlify.app>**, deployed from this repository
on Netlify. Pushing to `main` redeploys.

Next.js App Router, one page, no database, no CMS. Content lives in `app/content.ts`.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint
```

## Layout

```
app/
  layout.tsx    fonts (next/font), metadata, <html lang>
  page.tsx      the whole page: hero, stats, lifecycle, features, terminal, start, contribute
  content.ts    every visible string, in EN / PT / ES
  globals.css   the design system: tokens and component classes
```

`content.ts` is the only file you need to touch to change copy. It is typed, so
adding a string to one language without adding it to the others is a build error.

## The design system

Ported from the rh-harness landing page, which took it from the Claude Design
"Industry" system. Three locks hold it together:

- **One accent** (`#5980a6`, with `--color-accent-700` for anything that carries
  white text, so buttons clear WCAG AA).
- **One corner radius: zero.** Every surface, button, tag and panel is square.
  The only curves on the page are the background orbs, which are decoration.
- **One theme: light.** The page does not invert mid-scroll.

Structural conventions:

- `64px` blueprint grid behind everything, `1px` dividers instead of shadows.
- `.blueprint` frames get four corner ticks via `<Corners />`. That is the
  signature of the page; do not use the class without them.
- Three typefaces: Barlow Condensed for headings, Barlow for body, IBM Plex Mono
  for anything that is a command or a value.
- Grids use `data-g="..."` attributes so the responsive rules in `globals.css`
  can collapse them without touching component code.

## Motion

Three drifting orbs, a slow scan line, and a blinking terminal cursor. All of it
is switched off wholesale by the `prefers-reduced-motion` rule in `globals.css`.
If you add motion, that rule already covers it; do not opt out per-element.

## Copy rules

- **No em dashes.** Use a colon, a comma, or a plain hyphen. There is a grep for
  this in the maintenance notes below.
- The hero holds four text elements at most: headline, one subtext (20 words
  cap), the install command, and the CTAs.
- Section eyebrows are capped at `ceil(sectionCount / 3)`; with eight sections,
  three carry one.
- Two CTAs must never share an intent with different labels. "View on GitHub" is
  the label everywhere it appears.

## Adding a language

1. Add the code to the `Lang` union in `app/content.ts`.
2. Add the entry to `L` and to `DIMS`.
3. Add a `[code, label, name]` row to `LANGS`.

The language switcher, the `<html lang>` sync and the `localStorage` key all read
from those, so nothing else needs editing.

## Maintenance checks

```bash
# banned typography
grep -rn '—\|–\|“\|”' app/ && echo "em dash or smart quote found" || echo "clean"

# unused exports
grep -c 'heroWink\|startKicker' app/content.ts
```

## Deploying

`netlify.toml` in this repository pins the build: the Next.js Runtime, Node 22
LTS rather than whatever the platform default happens to be, and no header
rules. Headers live in `next.config.ts` on purpose, and `netlify.toml` records
why: rules declared there are applied by the CDN and do not reach HTML that the
Next.js runtime serves from a function, so X-Frame-Options and Referrer-Policy
were silently missing from every page while the config looked correct.

No environment variables are required. `process.env.URL`, which Netlify sets
during a build, feeds `metadataBase` so canonical and Open Graph tags point at
the deployed origin.

The page prerenders to static HTML, so plain static hosting works too:

```bash
npm run build        # emits a static route at /
```

GitHub Pages needs `output: 'export'` in `next.config.ts` first, since the
default build expects a Node server. Vercel or Netlify need no change.
