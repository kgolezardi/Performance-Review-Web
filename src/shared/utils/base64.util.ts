import { escape as base64urlEscape, unescape as base64urlUnescape } from 'base64-url';

export function escape(val: string) {
  return base64urlEscape(val);
}

export function unescape(val: string) {
  return base64urlUnescape(val);
}
