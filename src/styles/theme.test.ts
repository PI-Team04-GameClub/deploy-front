import { describe, it, expect } from 'vitest';
import theme from './theme';

describe('theme', () => {
  it('should be defined', () => {
    expect(theme).toBeDefined();
  });

  it('should have fonts defined', () => {
    expect(theme.fonts).toBeDefined();
    expect(theme.fonts.heading).toContain('Outfit');
    expect(theme.fonts.body).toContain('Inter');
  });

  it('should have brand colors defined', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.colors.brand).toBeDefined();
    expect(theme.colors.brand[500]).toBe('#6610f2');
  });

  it('should have all brand color shades', () => {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    shades.forEach(shade => {
      expect(theme.colors.brand[shade]).toBeDefined();
    });
  });

  it('should have component styles', () => {
    expect(theme.components).toBeDefined();
    expect(theme.components.Button).toBeDefined();
    expect(theme.components.Card).toBeDefined();
  });

  it('should have global styles', () => {
    expect(theme.styles).toBeDefined();
    expect(theme.styles.global).toBeDefined();
  });
});
