import React, { useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView, XStack, YStack, View } from 'tamagui';
import { ImageCard, KnowledgeCard, AICard, TipCard } from './cards';
import { colors } from '../theme/colors';
import type { FeedCard } from '../data/mockData';

interface MasonryListProps {
  data: FeedCard[];
  refreshing?: boolean;
  onRefresh?: () => void;
  ListHeaderComponent?: React.ReactElement;
}

export default function MasonryList({
  data,
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
}: MasonryListProps) {
  // 将数据分成两列
  const { leftColumn, rightColumn } = useMemo(() => {
    const left: FeedCard[] = [];
    const right: FeedCard[] = [];

    data.forEach((item, index) => {
      if (index % 2 === 0) {
        left.push(item);
      } else {
        right.push(item);
      }
    });

    return { leftColumn: left, rightColumn: right };
  }, [data]);

  // 渲染单个卡片
  const renderCard = (card: FeedCard) => {
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

  return (
    <ScrollView
      flex={1}
      backgroundColor="$background"
      contentContainerStyle={{ paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
      }
    >
      {/* Header 组件 */}
      {ListHeaderComponent}

      {/* 双列瀑布流 */}
      <XStack justifyContent="space-between">
        {/* 左列 */}
        <YStack flex={1} marginRight="$2">
          {leftColumn.map(renderCard)}
        </YStack>

        {/* 右列 */}
        <YStack flex={1} marginLeft="$2">
          {rightColumn.map(renderCard)}
        </YStack>
      </XStack>

      {/* 底部留白 */}
      <View height={100} />
    </ScrollView>
  );
}
