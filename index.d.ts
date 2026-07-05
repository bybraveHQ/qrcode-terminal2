export type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

export interface GenerateOptions {
  small?: boolean;
}

/** Numeric error-correction level currently in effect: L=1, M=0, Q=3, H=2. */
export const error: 0 | 1 | 2 | 3;

/** Render `input` as a QR code. Returns the rendered string; also invokes
 * `callback` if given, otherwise prints via console.log. */
export function generate(input: string, opts?: GenerateOptions, callback?: (qrcode: string) => void): string;
export function generate(input: string, callback?: (qrcode: string) => void): string;

/** Set the error-correction level for subsequent `generate` calls. */
export function setErrorLevel(error: ErrorLevel): void;

declare const qrcodeTerminal: {
  error: 0 | 1 | 2 | 3;
  generate: typeof generate;
  setErrorLevel: typeof setErrorLevel;
};

export default qrcodeTerminal;
