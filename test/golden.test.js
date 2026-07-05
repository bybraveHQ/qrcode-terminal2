'use strict';

// Byte-for-byte compatibility gate: render the same inputs with the original
// qrcode-terminal (../../qrcode-terminal-orig) and the fork, assert identical
// output. The original is dependency-free, so it loads without an install.
// Registered only when the local clone is present (absent in CI / tarball).

const assert = require('node:assert');
const { describe, it } = require('node:test');
const path = require('node:path');
const fork = require('..');

let orig = null;
try {
  orig = require(path.join(__dirname, '..', '..', 'qrcode-terminal-orig', 'lib', 'main.js'));
} catch {
  orig = null;
}

function render(mod, input, opts, level) {
  mod.setErrorLevel(level);
  let out;
  if (opts) mod.generate(input, opts, (s) => { out = s; });
  else mod.generate(input, (s) => { out = s; });
  return out;
}

const INPUTS = ['test', 'https://example.com', 'hello world', '1234567890', 'a', ''];
const LEVELS = ['L', 'M', 'Q', 'H'];
const MODES = [undefined, { small: true }];

if (orig) {
  describe('golden — fork matches the original byte-for-byte', () => {
    for (const input of INPUTS) {
      for (const level of LEVELS) {
        for (const mode of MODES) {
          const label = `input=${JSON.stringify(input)} level=${level} small=${!!mode}`;
          it(label, () => {
            const a = render(orig, input, mode, level);
            const b = render(fork, input, mode, level);
            assert.equal(b, a);
          });
        }
      }
    }
    // restore default so later suites see a clean state
    fork.setErrorLevel('L');
    orig.setErrorLevel('L');
  });
} else {
  describe('golden — skipped (original clone not available)', () => {
    it('is a local-only compatibility gate', { skip: true }, () => {});
  });
}
