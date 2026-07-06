# @bybrave/qrcode-terminal2

[![CI](https://github.com/bybraveHQ/qrcode-terminal2/actions/workflows/ci.yml/badge.svg)](https://github.com/bybraveHQ/qrcode-terminal2/actions)
[![npm](https://img.shields.io/npm/v/%40bybrave%2Fqrcode-terminal2)](https://www.npmjs.com/package/@bybrave/qrcode-terminal2)

Maintained fork of [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) — render QR codes as text in the terminal — with **dual ESM + CommonJS, bundled TypeScript types, and a strict-mode/ESM fix**.

The original has ~30M downloads/month and no release since March 2018. It's already dependency-free (the QR engine is vendored in), so this fork keeps the rendering **byte-for-byte identical** and focuses on what modern consumers were blocked on: ESM `import`, built-in types (no separate `@types/qrcode-terminal`), and source that survives a strict-mode / bundler build.

```bash
npm install @bybrave/qrcode-terminal2
```

```js
// CommonJS — drop-in
const qrcode = require('@bybrave/qrcode-terminal2');
qrcode.generate('https://example.com');

// ESM — default or named import
import qrcode from '@bybrave/qrcode-terminal2';
import { generate, setErrorLevel } from '@bybrave/qrcode-terminal2';

// TypeScript types built in — no @types/qrcode-terminal needed
```

## Usage

```js
const qrcode = require('@bybrave/qrcode-terminal2');

// Print a QR code
qrcode.generate('https://example.com');

// Smaller half-block rendering
qrcode.generate('https://example.com', { small: true });

// Get the string instead of printing (callback or return value)
qrcode.generate('https://example.com', (code) => console.log(code));
const code = qrcode.generate('https://example.com', { small: true }); // also returned

// Error-correction level: 'L' (default) | 'M' | 'Q' | 'H'
qrcode.setErrorLevel('H');
qrcode.generate('https://example.com');
```

### CLI

```bash
# installed globally as `qrcode-terminal2`
qrcode-terminal2 "hello world"
echo "https://example.com" | qrcode-terminal2
qrcode-terminal2 --help
qrcode-terminal2 --version
```

## Why this fork

| Fixed / improved | Original issue |
|---|---|
| **Built-in TypeScript types** — replaces the separate `@types/qrcode-terminal` package | [#27](https://github.com/gtanner/qrcode-terminal/issues/27) |
| **Strict-mode / ESM safe** — ANSI escapes rewritten from octal `\033` to hex `\x1b`, so the source no longer throws `Octal literal in strict mode` under ESM or a bundler | [#52](https://github.com/gtanner/qrcode-terminal/issues/52) |
| **`generate()` returns the string** — in addition to the callback / `console.log`, so you can capture output without a callback | [#24](https://github.com/gtanner/qrcode-terminal/issues/24) |
| **Dual ESM + CommonJS** — `import` and `require` both work | — |

The QR generation engine (`vendor/QRCode`, a port of Kazuhiko Arase's *QR Code for JavaScript*) and the terminal rendering are unchanged from `qrcode-terminal@0.12.0`, gated by a byte-for-byte golden test. The octal→hex escape change produces identical bytes (`\033` === `\x1b` === ESC).

## Migration

Drop-in — change the dependency name:

```diff
- const qrcode = require('qrcode-terminal');
+ const qrcode = require('@bybrave/qrcode-terminal2');
```

```diff
- "qrcode-terminal": "^0.12.0",
- "@types/qrcode-terminal": "^0.12.0",
+ "@bybrave/qrcode-terminal2": "^1.0.0",
```

Remove `@types/qrcode-terminal` — the types ship with this package. **Requires Node.js >= 18.**

## Known limitations (by design)

- **Small QR codes may not scan on some terminal fonts** ([#21](https://github.com/gtanner/qrcode-terminal/issues/21), [#44](https://github.com/gtanner/qrcode-terminal/issues/44)). The `{ small: true }` half-block rendering packs two module rows into one character row; on fonts/terminals with non-square cells or line-height gaps the scanner can't resolve the modules. This is a terminal rendering constraint, not something the library can fix reliably — use a terminal with a square monospace font, or the default (larger) rendering, if a code won't scan.
- **You can't set an arbitrary pixel size** ([#51](https://github.com/gtanner/qrcode-terminal/issues/51), [#9](https://github.com/gtanner/qrcode-terminal/issues/9)). A QR code's dimensions are determined by how much data it encodes and the chosen version/error-correction level — it can't be stretched to a target width in the terminal. Shorten the payload or lower the error-correction level to get a smaller code.

## Support

If this package saves you time, you can support maintenance:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy%20me%20a%20coffee-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/bybrave)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-BTC-F7931A?logo=bitcoin&logoColor=white)](#support)

Bitcoin (BTC): `bc1q37557q5jpeaxqydzwvf3jgj7zhnfpn2td3q40q`

## License

Apache-2.0. Copyright (c) Gord Tanner and Michael Brooks (original `qrcode-terminal`); modifications copyright (c) 2026 bybrave. The vendored QR engine (`vendor/QRCode`) is MIT, copyright (c) 2009 Kazuhiko Arase. See [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
