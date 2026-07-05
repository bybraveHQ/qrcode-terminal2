# Changelog

## 1.0.0

Initial release of the maintained fork of [`qrcode-terminal`](https://github.com/gtanner/qrcode-terminal) (forked from `qrcode-terminal@0.12.0`).

### Added
- **Dual ESM + CommonJS** — `import` (default and named) and `require` both work.
- **Built-in TypeScript types** (`index.d.ts`) — replaces the separate `@types/qrcode-terminal` package.
- `generate()` now returns the rendered string in addition to invoking the callback / `console.log` ([#24](https://github.com/gtanner/qrcode-terminal/issues/24)).
- Byte-for-byte golden test comparing the fork against the original across default and `small` rendering and every error-correction level.

### Fixed
- **Octal literal in strict mode / ESM** — ANSI escapes rewritten from octal `\033` to hex `\x1b`; the source no longer throws under ESM or a bundler ([#52](https://github.com/gtanner/qrcode-terminal/issues/52)). Output bytes are unchanged (`\033` === `\x1b` === ESC).

### Compatibility
- The QR engine (`vendor/QRCode`) and terminal rendering are unchanged from `qrcode-terminal@0.12.0`; the public API (`generate`, `setErrorLevel`, `error`) and the CLI are identical.
- Requires Node.js >= 18.
- `{ small: true }` scannability on some terminal fonts ([#21](https://github.com/gtanner/qrcode-terminal/issues/21)) and fixed QR dimensions ([#51](https://github.com/gtanner/qrcode-terminal/issues/51)) are inherent constraints, documented in the README.

### License
- Apache-2.0 (unchanged from the original). The vendored QR engine remains MIT (Kazuhiko Arase). See NOTICE.
