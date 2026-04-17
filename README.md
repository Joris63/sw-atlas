# sw-atlas

SwAtlas is a Vue 3 component library and live styleguide. It exports reusable UI components, design tokens, and layout primitives that can be imported into any project in the ecosystem.

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## CSS Naming Convention

All component styles follow **BEM** with a `sw-` design system prefix.

```
sw-{block}__{element}--{modifier}
```

| Separator | Role | Example |
|---|---|---|
| `sw-` | Design system prefix — on every class | `sw-button`, `sw-nav-item` |
| `-` | Word separator within a segment | `sw-top-bar`, `sw-dark-mode-toggle` |
| `__` | Block → Element | `sw-button__icon`, `sw-nav-item__label` |
| `--` | Block/Element → Modifier | `sw-button--primary`, `sw-input--md` |

**Rules:**
- Block name mirrors the Vue filename — no abbreviations. `SwButton` → `sw-button`, `SwNavSidebar` → `sw-nav-sidebar`
- One block per component — a single root block class, no secondary blocks
- Full words only — no shortcuts like `btn`, `pg`, `sep`, `topbar`
- Modifiers for variants, sizes, and states — e.g. `--primary`, `--md`, `--open`, `--loading`
