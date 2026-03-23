import { colorTokens, fontSizeTokens } from './tokens';

export type AppTheme = {
  colors: typeof colorTokens;
  fontSizes: typeof fontSizeTokens;
};

export const theme: AppTheme = {
  colors: colorTokens,
  fontSizes: fontSizeTokens,
};
