import React from 'react';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import type { FeedCard } from '../../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface AICardProps {
  card: FeedCard;
  onPress?: () => void;
  fullWidth?: boolean;
}

export default function AICard({ card, onPress, fullWidth = false }: AICardProps) {
  const cardWidth = fullWidth ? width - 32 : CARD_WIDTH;
  
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <View
        width={cardWidth}
        marginBottom={12}
        borderRadius={6}
        overflow="hidden"
        height={fullWidth ? 100 : 140}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
          
          {/* AI 标识 */}
          <View
            position="absolute"
            top={10}
            left={10}
            backgroundColor="white"
            paddingHorizontal={6}
            paddingVertical={3}
            borderRadius={4}
          >
            <XStack alignItems="center" gap={3}>
              <Ionicons name="sparkles" size={10} color={colors.primary} />
              <Text fontSize={10} fontWeight="600" color={colors.primary}>
                AI
              </Text>
            </XStack>
          </View>
          
          {/* 内容 */}
          <YStack
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            padding={12}
          >
            <XStack alignItems="center" gap={6} marginBottom={2}>
              <Ionicons name={card.icon as any} size={16} color="white" />
              <Text
                fontSize={fullWidth ? 14 : 13}
                fontWeight="600"
                color="white"
                numberOfLines={1}
                flex={1}
              >
                {card.title}
              </Text>
            </XStack>
            {card.subtitle && (
              <Text
                fontSize={11}
                color="rgba(255,255,255,0.75)"
                numberOfLines={1}
              >
                {card.subtitle}
              </Text>
            )}
          </YStack>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
