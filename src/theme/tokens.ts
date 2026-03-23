export const colorTokens = {
  red: '#fecaca',
  orange: '#fed7aa',
  green: '#bbf7d0',
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6b7280',
} as const;

export type ColorTokenName = keyof typeof colorTokens;

export const fontSizeTokens = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
} as const;

export type FontSizeTokenName = keyof typeof fontSizeTokens;

const TOKEN_PREFIX = 'tokens.';

/**
 * Resolves a note `color` field to a CSS color.
 * - `tokens.<name>` → value from `colorTokens`
 * - Otherwise returns the string as-is (e.g. legacy `#RRGGBB`)
 */
export function resolveNoteColor(colorRef: string): string {
  if (!colorRef.startsWith(TOKEN_PREFIX)) {
    return colorRef;
  }

  const name = colorRef.slice(TOKEN_PREFIX.length) as ColorTokenName;
  if (name in colorTokens) {
    return colorTokens[name];
  }

  return '#ffffff';
}
