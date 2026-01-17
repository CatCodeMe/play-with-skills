import React from 'react';
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { YStack, Text, View } from 'tamagui';
import { colors } from '../../theme/colors';
import type { FeedCard } from '../../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface ImageCardProps {
  card: FeedCard;
  onPress?: () => void;
}

export default function ImageCard({ card, onPress }: ImageCardProps) {
  const getImageHeight = () => {
    switch (card.height) {
      case 'short': return 100;
      case 'tall': return 180;
      default: return 140;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <View
        width={CARD_WIDTH}
        marginBottom={12}
        backgroundColor="white"
        borderRadius={6}
        overflow="hidden"
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.04}
        shadowRadius={4}
        elevation={1}
      >
        <Image
          source={{ uri: card.image }}
          style={{
            width: '100%',
            height: getImageHeight(),
            backgroundColor: colors.border,
          }}
          resizeMode="cover"
        />
        <YStack padding={10}>
          <Text
            fontSize={13}
            fontWeight="500"
            color={colors.textPrimary}
            numberOfLines={2}
            lineHeight={18}
          >
            {card.title}
          </Text>
          {card.subtitle && (
            <Text
              fontSize={11}
              color={colors.textLight}
              numberOfLines={1}
              marginTop={2}
            >
              {card.subtitle}
            </Text>
          )}
        </YStack>
      </View>
    </TouchableOpacity>
  );
}
