import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { YStack, XStack, Text, View, ScrollView } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  SimpleHeader, 
  HeroCard, 
  FeaturedCard, 
  QuickActions,
  ImageCard,
  KnowledgeCard,
  AICard,
  TipCard,
} from '../components';
import { generateFeedData, aiCards } from '../data/mockData';
import { colors } from '../theme/colors';

export default function PetScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [feedData, setFeedData] = useState(() => generateFeedData());

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setFeedData(generateFeedData());
      setRefreshing(false);
    }, 1000);
  }, []);

  // 渲染卡片
  const renderCard = (card: any, index: number) => {
    // AI 卡片在第一个位置做成满宽
    if (card.type === 'ai' && index === 0) {
      return <AICard key={card.id} card={card} fullWidth />;
    }
    
    switch (card.type) {
      case 'image':
        return <ImageCard key={card.id} card={card} />;
      case 'knowledge':
        return <KnowledgeCard key={card.id} card={card} />;
      case 'ai':
        return <AICard key={card.id} card={card} />;
      case 'tip':
        return <TipCard key={card.id} card={card} />;
      default:
        return null;
    }
  };

  // 分成两列
  const leftColumn = feedData.filter((_, i) => i % 2 === 0);
  const rightColumn = feedData.filter((_, i) => i % 2 === 1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* 极简头部 */}
      <SimpleHeader />

      <ScrollView
        flex={1}
        backgroundColor={colors.background}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Hero 大图 */}
        <View paddingTop={8}>
          <HeroCard />
        </View>

        {/* 快捷功能 */}
        <QuickActions />

        {/* 今日精选 */}
        <YStack paddingHorizontal={16} marginBottom={8}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
            <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
              今日精选
            </Text>
            <Text fontSize={13} color={colors.textSecondary}>
              查看更多
            </Text>
          </XStack>
        </YStack>
        
        <FeaturedCard
          title="春季驱虫完全指南"
          subtitle="每月体外驱虫，每三月体内驱虫，远离寄生虫"
          imageUrl="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800"
          tag="健康必读"
        />

        {/* AI 功能入口 - 满宽 */}
        <YStack paddingHorizontal={16} marginBottom={8}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
            <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
              AI 智能工具
            </Text>
          </XStack>
          <AICard card={aiCards[0]} fullWidth />
        </YStack>

        {/* 发现更多 - 瀑布流 */}
        <YStack paddingHorizontal={16}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
            <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
              发现更多
            </Text>
            <Text fontSize={13} color={colors.textSecondary}>
              刷新
            </Text>
          </XStack>

          {/* 双列瀑布流 */}
          <XStack justifyContent="space-between">
            <YStack flex={1} marginRight={6}>
              {leftColumn.slice(0, 6).map((card, index) => renderCard(card, index))}
            </YStack>
            <YStack flex={1} marginLeft={6}>
              {rightColumn.slice(0, 6).map((card, index) => renderCard(card, index))}
            </YStack>
          </XStack>
        </YStack>

        {/* 底部留白 */}
        <View height={100} />
      </ScrollView>
    </SafeAreaView>
  );
}
