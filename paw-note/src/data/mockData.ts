/**
 * 瀑布流 Mock 数据
 * 用于首页展示的各类卡片内容
 */

export type CardType = 'image' | 'knowledge' | 'ai' | 'tip';

export interface FeedCard {
  id: string;
  type: CardType;
  title: string;
  subtitle?: string;
  image?: string;
  icon?: string;
  color?: string;
  tag?: string;
  height?: 'short' | 'medium' | 'tall'; // 用于瀑布流高度变化
}

// 宠物图片卡片（使用 placeholder 图片）
const imageCards: FeedCard[] = [
  {
    id: 'img-1',
    type: 'image',
    title: '今日份的小可爱 🐱',
    subtitle: '阳光下的午后时光',
    image: 'https://placekitten.com/400/500',
    height: 'tall',
  },
  {
    id: 'img-2',
    type: 'image',
    title: '遛狗日记 🐕',
    subtitle: '公园里的快乐时光',
    image: 'https://placedog.net/400/400',
    height: 'medium',
  },
  {
    id: 'img-3',
    type: 'image',
    title: '喵星人的凝视',
    subtitle: '你在看什么？',
    image: 'https://placekitten.com/400/600',
    height: 'tall',
  },
  {
    id: 'img-4',
    type: 'image',
    title: '狗狗的微笑',
    subtitle: '每一天都很开心',
    image: 'https://placedog.net/400/350',
    height: 'short',
  },
  {
    id: 'img-5',
    type: 'image',
    title: '窗边的猫咪',
    subtitle: '看着窗外发呆',
    image: 'https://placekitten.com/400/450',
    height: 'medium',
  },
];

// 知识卡片
const knowledgeCards: FeedCard[] = [
  {
    id: 'know-1',
    type: 'knowledge',
    title: '春季驱虫指南',
    subtitle: '每月体外驱虫，每三月体内驱虫，让毛孩远离寄生虫困扰',
    icon: 'bug-outline',
    color: 'mint',
    tag: '健康',
    height: 'medium',
  },
  {
    id: 'know-2',
    type: 'knowledge',
    title: '猫咪饮水量标准',
    subtitle: '成年猫每天需要 40-60ml/kg 的水分摄入',
    icon: 'water-outline',
    color: 'sky',
    tag: '饮食',
    height: 'short',
  },
  {
    id: 'know-3',
    type: 'knowledge',
    title: '狗狗疫苗时间表',
    subtitle: '幼犬 6-8 周开始接种，每年定期加强免疫',
    icon: 'medical-outline',
    color: 'peach',
    tag: '疫苗',
    height: 'medium',
  },
  {
    id: 'know-4',
    type: 'knowledge',
    title: '宠物零食怎么选',
    subtitle: '避免高盐高糖，选择天然成分的零食',
    icon: 'nutrition-outline',
    color: 'lemon',
    tag: '饮食',
    height: 'short',
  },
];

// AI 功能卡片
const aiCards: FeedCard[] = [
  {
    id: 'ai-1',
    type: 'ai',
    title: '拍照识别品种',
    subtitle: '拍一张照片，AI 帮你识别宠物品种',
    icon: 'camera-outline',
    height: 'medium',
  },
  {
    id: 'ai-2',
    type: 'ai',
    title: '智能问答',
    subtitle: '有任何养宠问题？问问 AI 助手',
    icon: 'chatbubble-ellipses-outline',
    height: 'short',
  },
  {
    id: 'ai-3',
    type: 'ai',
    title: '便便分析',
    subtitle: '拍照分析便便健康状况',
    icon: 'scan-outline',
    height: 'medium',
  },
];

// 小贴士卡片
const tipCards: FeedCard[] = [
  {
    id: 'tip-1',
    type: 'tip',
    title: '💡 今日小贴士',
    subtitle: '定期给猫咪剪指甲，每 2-3 周一次，避免抓伤家具和主人',
    height: 'short',
  },
  {
    id: 'tip-2',
    type: 'tip',
    title: '💡 健康提醒',
    subtitle: '狗狗洗澡不宜过频，夏季每周一次，冬季每两周一次',
    height: 'short',
  },
];

// 快捷功能入口
export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export const quickActions: QuickAction[] = [
  { id: 'vaccine', title: '疫苗提醒', icon: 'calendar-outline', color: '#7EB8A2' },
  { id: 'health', title: '健康档案', icon: 'medical-outline', color: '#F4B9A0' },
  { id: 'food', title: '饮食记录', icon: 'nutrition-outline', color: '#FFD93D' },
  { id: 'album', title: '相册', icon: 'camera-outline', color: '#42A5F5' },
  { id: 'weight', title: '体重记录', icon: 'fitness-outline', color: '#AB47BC' },
  { id: 'grooming', title: '美容护理', icon: 'cut-outline', color: '#EC407A' },
];

// 生成混合瀑布流数据
export function generateFeedData(): FeedCard[] {
  const allCards = [...imageCards, ...knowledgeCards, ...aiCards, ...tipCards];
  
  // 打乱顺序，但确保 AI 卡片均匀分布
  const shuffled: FeedCard[] = [];
  const nonAiCards = allCards.filter(c => c.type !== 'ai');
  const aiCardsCopy = [...aiCards];
  
  // 简单的交错排列
  let aiIndex = 0;
  for (let i = 0; i < nonAiCards.length; i++) {
    shuffled.push(nonAiCards[i]);
    // 每隔 3 个非 AI 卡片插入一个 AI 卡片
    if ((i + 1) % 3 === 0 && aiIndex < aiCardsCopy.length) {
      shuffled.push(aiCardsCopy[aiIndex]);
      aiIndex++;
    }
  }
  
  // 添加剩余的 AI 卡片
  while (aiIndex < aiCardsCopy.length) {
    shuffled.push(aiCardsCopy[aiIndex]);
    aiIndex++;
  }
  
  return shuffled;
}

export { imageCards, knowledgeCards, aiCards, tipCards };
