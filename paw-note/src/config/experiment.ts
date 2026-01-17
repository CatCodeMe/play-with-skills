/**
 * 实验配置
 * 用于快速切换不同的导航和布局方案
 */

export type LayoutVariant = 'A' | 'B' | 'C' | 'D';

export interface ExperimentConfig {
  // 当前布局方案
  layout: LayoutVariant;
  
  // 方案说明
  layoutDescriptions: Record<LayoutVariant, string>;
}

export const experimentConfig: ExperimentConfig = {
  // 👇 修改这里切换方案
  layout: 'D',
  
  layoutDescriptions: {
    'A': 'AI-First: 2 Tab, AI 输入框在首页顶部',
    'B': '卡片仪表盘: 3 Tab, 数据卡片 + AI 入口',
    'C': '无底部导航: 侧边栏菜单',
    'D': 'B+C 融合: 宠物切换 + 数据仪表盘 + 3 Tab',
  },
};

// 快捷判断函数
export const isLayoutA = () => experimentConfig.layout === 'A';
export const isLayoutB = () => experimentConfig.layout === 'B';
export const isLayoutC = () => experimentConfig.layout === 'C';
export const isLayoutD = () => experimentConfig.layout === 'D';
