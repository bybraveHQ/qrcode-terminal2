import qrcode, { generate, setErrorLevel, error, ErrorLevel, GenerateOptions } from '../index';

qrcode.generate('https://example.com');
const a: string = qrcode.generate('x', { small: true });
const b: string = generate('x', (code: string) => { void code.length; });
const c: string = generate('x', { small: true }, (code: string) => { void code.length; });

const opts: GenerateOptions = { small: true };
void generate('x', opts);

const level: ErrorLevel = 'H';
setErrorLevel(level);
qrcode.setErrorLevel('L');

const e: 0 | 1 | 2 | 3 = error;

void [a, b, c, e];
