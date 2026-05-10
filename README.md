# Chai CSS Engine

A lightweight utility-first CSS engine built with plain JavaScript. Instead of writing CSS rules for every component,
you add classes such as `chai-p-12`, `chai-bg-blue`, or `chai-text-center`. The engine scans the DOM, parses matching
classes, applies inline styles, and removes the original `chai-*` classes by default.

## Run the Demo

Open `index.html` in a browser.

```text
chai-css-engine/index.html
```

No build step or dependency installation is required.

## How It Works

1. `src/chai.js` waits for `DOMContentLoaded`.
2. It finds elements with classes containing `chai-`.
3. Each utility class is parsed into a style object.
4. The style object is applied to the element with `element.style`.
5. Applied `chai-*` classes are removed, leaving normal classes untouched.

You can also call the library manually:

```html
<script src="./src/chai.js"></script>
<script>
  ChaiCSS.scan(document);
  ChaiCSS.observe(document.body);
</script>
```

## Supported Utility Examples

### Spacing

- `chai-p-12` -> `padding: 12px`
- `chai-pt-8` -> `padding-top: 8px`
- `chai-px-20` -> left and right padding
- `chai-m-16` -> `margin: 16px`
- `chai-mt-12` -> `margin-top: 12px`
- `chai-gap-10` -> `gap: 10px`

### Colors

- `chai-bg-red` -> red background from the theme map
- `chai-bg-0f172a` -> hex background
- `chai-bg-[linear-gradient(135deg,_#111827,_#8b5cf6)]` -> arbitrary value
- `chai-text-blue` -> blue text
- `chai-text-[rebeccapurple]` -> arbitrary text color

### Typography

- `chai-text-left`, `chai-text-center`, `chai-text-right`, `chai-text-justify`
- `chai-text-sm`, `chai-text-base`, `chai-text-xl`, `chai-text-3xl`
- `chai-font-normal`, `chai-font-medium`, `chai-font-bold`
- `chai-leading-1.6`

### Borders and Radius

- `chai-border`
- `chai-border-2`
- `chai-border-blue`
- `chai-rounded`
- `chai-rounded-lg`
- `chai-rounded-24`

### Layout and Sizing

- `chai-block`, `chai-inline`, `chai-inline-block`, `chai-flex`, `chai-grid`, `chai-hidden`
- `chai-flex-row`, `chai-flex-col`
- `chai-items-center`, `chai-items-start`, `chai-items-end`
- `chai-justify-between`, `chai-justify-center`, `chai-justify-end`
- `chai-wrap`, `chai-nowrap`
- `chai-w-120`, `chai-h-48`, `chai-max-w-640`, `chai-min-h-180`

## API

### `ChaiCSS.parseUtility(className)`

Returns a style object for one utility class.

```js
ChaiCSS.parseUtility("chai-px-12");
// { paddingLeft: "12px", paddingRight: "12px" }
```

### `ChaiCSS.scan(root, options)`

Scans a root element or document and applies utilities.

```js
ChaiCSS.scan(document, { removeClasses: true });
```

### `ChaiCSS.observe(root, options)`

Starts a `MutationObserver` for dynamically added elements.

```js
const observer = ChaiCSS.observe(document.body);
```

## Tests

Run the parser tests with Node:

```bash
node tests/chai.test.js
```
