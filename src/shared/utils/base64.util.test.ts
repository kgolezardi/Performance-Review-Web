import { escape, unescape } from './base64.util';

describe('base64 utils', () => {
  describe('escape', () => {
    it('should return escape of base64 to use in url', () => {
      expect(escape('This+is/goingto+escape==')).toBe('This-is_goingto-escape');
    });
  });
  describe('unescape', () => {
    it('should return unescape url to base64', () => {
      expect(unescape('This-is_goingto-escape')).toBe('This+is/goingto+escape==');
    });
  });
});
