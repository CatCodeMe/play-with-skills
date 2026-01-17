import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import type { FeedCard } from '../../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface TipCardProps {
  card: FeedCard;
  onPress?: () => void;
}

export default function TipCard({ card, onPress }: TipCardProps) {
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
        {/* 顶部标签 */}
        <XStack alignItems="center" gap={4} marginBottom={10}>
          <Ionicons name="bulb-outline" size={14} color={colors.accent} />
          <Text fontSize={11} color={colors.textLight} fontWeight="500">
            小贴士
          </Text>
        </XStack>
        
        {card.subtitle && (
          <Text
            fontSize={12}
            color={colors.textPrimary}
            numberOfLines={4}
            lineHeight={18}
          >
            {card.subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
