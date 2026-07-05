'use strict';

// Regression coverage for the issues the fork closes.

const assert = require('node:assert');
const { describe, it } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const qrcode = require('..');
const pkg = require('../package.json');

const ESC = '\x1b';

describe('#52 — strict-mode / ESM safe (no octal escapes)', () => {
  it('lib/main.js uses hex escapes, not octal, in ANSI sequences', () => {
    const src = fs.readFileSync(path.join(__dirname, '..', 'lib', 'main.js'), 'utf8');
    assert.ok(!src.includes('\\033['), 'ANSI escapes must not use octal \\033[');
    assert.ok(src.includes('\\x1b['), 'ANSI escapes should use hex \\x1b[');
  });

  it('output still contains the ESC control byte (identical to octal)', () => {
    const out = qrcode.generate('test', () => {});
    assert.ok(out.includes(ESC), 'default rendering uses ANSI escapes');
  });

  it('loads as an ES module without a strict-mode parse error', async () => {
    const mod = await import('../index.mjs');
    assert.equal(typeof mod.default.generate, 'function');
    assert.equal(typeof mod.generate, 'function');
  });
});

describe('#24 — generate() returns the rendered string', () => {
  it('returns the string with no callback', () => {
    const original = console.log;
    console.log = () => {};
    let out;
    try {
      out = qrcode.generate('test');
    } finally {
      console.log = original;
    }
    assert.equal(typeof out, 'string');
    assert.ok(out.length > 0);
  });

  it('returns the same string it passes to the callback', () => {
    let viaCb;
    const returned = qrcode.generate('test', (s) => { viaCb = s; });
    assert.equal(returned, viaCb);
  });
});

describe('#17 — small:true without a callback does not throw', () => {
  it('renders small mode via console.log without a callback', () => {
    const original = console.log;
    console.log = () => {};
    try {
      assert.doesNotThrow(() => qrcode.generate('test', { small: true }));
    } finally {
      console.log = original;
    }
  });
});

describe('packaging invariants', () => {
  it('declares no runtime dependencies', () => {
    assert.deepEqual(pkg.dependencies, undefined);
  });

  it('ships a CLI bin', () => {
    assert.ok(pkg.bin && pkg.bin['qrcode-terminal2']);
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'bin', 'qrcode-terminal.js')));
  });
});

describe('ESM named exports are callable standalone', () => {
  it('bound generate works without the module object', async () => {
    const { generate, setErrorLevel } = await import('../index.mjs');
    setErrorLevel('L');
    let out;
    generate('standalone', (s) => { out = s; });
    assert.equal(typeof out, 'string');
    assert.ok(out.length > 0);
  });
});
