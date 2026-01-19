/**
 * 毛孩档案 - 配色方案 V3: Cozy Luxe (慵懒轻奢风)
 * 
 * 设计理念：温馨阳光午后，毛孩慵懒躺卧的感觉
 * 核心色调：焦糖棕 + 奶油白 + 蜜桃粉 + 黄昏金
 */

export const colors = {
  // ═══════════════════════════════════════════════════════════
  // 主色调 - 焦糖棕 (Caramel) - 温暖、信赖、高级感
  // ═══════════════════════════════════════════════════════════
  primary: '#C4946A',          // 核心焦糖色
  primaryLight: '#DEB896',     // 淡焦糖
  primaryDark: '#A67B52',      // 深焦糖
  primaryMuted: '#E8D5C4',     // 米焦糖（用于大面积背景）

  // ═══════════════════════════════════════════════════════════
  // 辅助色 - 蜜桃粉 (Peach Blush) - 柔和、亲切
  // ═══════════════════════════════════════════════════════════
  secondary: '#E8B4A6',        // 柔和蜜桃
  secondaryLight: '#F5D4CB',   // 淡蜜桃
  secondaryDark: '#D49586',    // 深蜜桃

  // ═══════════════════════════════════════════════════════════
  // 强调色 - 黄昏金 (Sunset Gold) - 活力、惊喜
  // ═══════════════════════════════════════════════════════════
  accent: '#E6A44E',           // 暖金色
  accentLight: '#F5C882',      // 淡金
  accentDark: '#C98B3A',       // 深金

  // ═══════════════════════════════════════════════════════════
  // 中性色 - 奶油调 (Cream Palette)
  // ═══════════════════════════════════════════════════════════
  background: '#FAF6F1',       // 奶油白背景
  surface: '#FFFFFF',          // 纯白卡片
  surfaceElevated: '#FFFCF8',  // 提升的白色（带暖调）
  surfaceVariant: '#F5EDE4',   // 米白变体

  // ═══════════════════════════════════════════════════════════
  // 文字色 - 巧克力调
  // ═══════════════════════════════════════════════════════════
  textPrimary: '#3D2F25',      // 深巧克力（主标题）
  textSecondary: '#6B5B50',    // 中巧克力（副文字）
  textTertiary: '#9A8A7D',     // 浅巧克力（辅助信息）
  textLight: '#B8A89A',        // 极浅（占位符/禁用）
  textOnDark: '#FFFFFF',       // 深色背景上的白字
  textOnPrimary: '#FFFFFF',    // 主色上的白字

  // ═══════════════════════════════════════════════════════════
  // 边框/分割线
  // ═══════════════════════════════════════════════════════════
  border: '#EBE3D9',           // 自然边框
  borderLight: '#F5EFE7',      // 极浅边框
  divider: '#E5DDD2',          // 分割线

  // ═══════════════════════════════════════════════════════════
  // 状态色 - 柔和变体 (Soft State Colors)
  // ═══════════════════════════════════════════════════════════
  success: '#7DB89A',          // 柔绿（健康/成功）
  successLight: '#D4EADF',
  warning: '#E8B86D',          // 暖黄（提醒）
  warningLight: '#FBF0DB',
  error: '#D98B8B',            // 柔红（错误/危险）
  errorLight: '#F8E5E5',
  info: '#8EBCD4',             // 天蓝（信息）
  infoLight: '#E3F1F7',

  // ═══════════════════════════════════════════════════════════
  // Tab 栏
  // ═══════════════════════════════════════════════════════════
  tabActive: '#C4946A',
  tabInactive: '#B8A89A',
  tabBackground: '#FFFFFF',

  // ═══════════════════════════════════════════════════════════
  // 卡片特殊背景色
  // ═══════════════════════════════════════════════════════════
  card: {
    cream: '#FFF9F2',          // 奶油卡片（默认）
    caramel: '#FBF2E8',        // 焦糖调卡片
    peach: '#FFF5F0',          // 蜜桃调卡片
    gold: '#FFFAF0',           // 金色调卡片
    sage: '#F4F8F5',           // 鼠尾草绿卡片
    sky: '#F4F9FC',            // 天蓝卡片
  },

  // ═══════════════════════════════════════════════════════════
  // 渐变色
  // ═══════════════════════════════════════════════════════════
  gradient: {
    // 主渐变 - 焦糖温暖
    primary: ['#C4946A', '#DEB896'],
    primaryReverse: ['#DEB896', '#C4946A'],

    // 黄昏渐变 - 头部背景
    sunset: ['#E8B4A6', '#F5C882'],
    sunsetDeep: ['#D49586', '#E6A44E'],

    // AI 功能专用
    ai: ['#C4946A', '#E6A44E'],
    aiMuted: ['#E8D5C4', '#F5C882'],

    // 卡片用透明渐变
    cardFade: ['rgba(255,252,248,0)', 'rgba(255,252,248,1)'],

    // 深色遮罩
    overlay: ['rgba(61,47,37,0)', 'rgba(61,47,37,0.7)'],
    overlayLight: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)'],
  },

  // ═══════════════════════════════════════════════════════════
  // 阴影色（用于 shadowColor）
  // ═══════════════════════════════════════════════════════════
  shadow: {
    default: '#C4946A',        // 暖色阴影
    neutral: '#3D2F25',        // 中性阴影
    soft: '#E8D5C4',           // 极柔阴影
  },

  // ═══════════════════════════════════════════════════════════
  // 特殊效果
  // ═══════════════════════════════════════════════════════════
  glassmorphism: {
    background: 'rgba(255, 252, 248, 0.8)',
    border: 'rgba(255, 255, 255, 0.5)',
  },
};

// 预设阴影样式
export const shadows = {
  sm: {
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
};

// 圆角预设
export const radius = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

// 间距预设
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export default colors;
