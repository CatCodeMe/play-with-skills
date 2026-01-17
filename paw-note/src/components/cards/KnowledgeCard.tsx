import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import type { FeedCard } from '../../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface KnowledgeCardProps {
  card: FeedCard;
  onPress?: () => void;
}

export default function KnowledgeCard({ card, onPress }: KnowledgeCardProps) {
  const getAccentColor = () => {
    switch (card.color) {
      case 'mint': return colors.primary;
      case 'peach': return colors.secondary;
      case 'lemon': return colors.accentDark;
      case 'sky': return colors.info;
      default: return colors.primary;
    }
  };

  const accentColor = getAccentColor();

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <View
        width={CARD_WIDTH}
        marginBottom={12}
        backgroundColor="white"
        borderRadius={6}
        padding={14}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.04}
        shadowRadius={4}
        elevation={1}
      >
        {/* 顶部：图标 + 标签 */}
        <XStack alignItems="center" justifyContent="space-between" marginBottom={10}>
          <View
            width={32}
            height={32}
            borderRadius={6}
            alignItems="center"
            justifyContent="center"
            backgroundColor={accentColor + '10'}
          >
            <Ionicons name={card.icon as any} size={16} color={accentColor} />
          </View>
          {card.tag && (
            <Text fontSize={10} color={colors.textLight}>
              {card.tag}
            </Text>
          )}
        </XStack>

        {/* 内容 */}
        <Text
          fontSize={13}
          fontWeight="600"
          color={colors.textPrimary}
          numberOfLines={2}
          marginBottom={4}
          lineHeight={18}
        >
          {card.title}
        </Text>
        {card.subtitle && (
          <Text
            fontSize={11}
            color={colors.textSecondary}
            numberOfLines={2}
            lineHeight={16}
          >
            {card.subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
