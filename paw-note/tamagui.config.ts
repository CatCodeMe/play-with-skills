import { createAnimations } from '@tamagui/animations-react-native';
import { createTamagui, createTokens } from 'tamagui';
import { config as configBase } from '@tamagui/config/v3';

// 清新薄荷配色方案
const tokens = createTokens({
  ...configBase.tokens,
  color: {
    ...configBase.tokens.color,
    // 主色调 - 薄荷绿
    primary: '#7EB8A2',
    primaryLight: '#A5D4C3',
    primaryDark: '#5A9A84',
    // 辅助色 - 珊瑚橙
    secondary: '#F4B9A0',
    secondaryLight: '#FACEBC',
    secondaryDark: '#E09B7D',
    // 强调色 - 柠檬黄
    accent: '#FFD93D',
    accentLight: '#FFE57A',
    accentDark: '#F5C800',
    // 背景色
    background: '#F5FAF7',
    surface: '#FFFFFF',
    surfaceVariant: '#EDF5F0',
    // 文字色
    textPrimary: '#2D3A35',
    textSecondary: '#6B7B75',
    textLight: '#9BA8A2',
    // 边框
    border: '#E8F0EC',
    divider: '#DDE8E2',
    // 卡片背景色
    cardMint: '#E8F5EF',
    cardPeach: '#FFF0E8',
    cardLemon: '#FFF9E0',
    cardSky: '#E8F4FA',
  },
});

const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 150,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
});

export const tamaguiConfig = createTamagui({
  ...configBase,
  tokens,
  animations,
  themes: {
    ...configBase.themes,
    light: {
      ...configBase.themes.light,
      background: tokens.color.background,
      backgroundHover: tokens.color.surfaceVariant,
      backgroundPress: tokens.color.surfaceVariant,
      color: tokens.color.textPrimary,
      colorHover: tokens.color.textPrimary,
      colorPress: tokens.color.textSecondary,
      borderColor: tokens.color.border,
      // 自定义主题色
      primary: tokens.color.primary,
      secondary: tokens.color.secondary,
      accent: tokens.color.accent,
    },
  },
});

export default tamaguiConfig;

// 类型声明
export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
