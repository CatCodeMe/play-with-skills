import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface FeaturedCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  tag?: string;
  onPress?: () => void;
}

export default function FeaturedCard({
  title,
  subtitle,
  imageUrl,
  tag = '精选',
  onPress,
}: FeaturedCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress}>
      <View
        marginHorizontal={16}
        marginBottom={20}
        borderRadius={8}
        overflow="hidden"
        height={140}
      >
        <ImageBackground
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '65%',
            }}
          />
          
          <View
            position="absolute"
            top={10}
            left={10}
            backgroundColor="white"
            paddingHorizontal={8}
            paddingVertical={4}
            borderRadius={4}
          >
            <Text fontSize={10} fontWeight="600" color={colors.textPrimary}>
              {tag}
            </Text>
          </View>
          
          <YStack
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            padding={14}
          >
            <Text
              fontSize={16}
              fontWeight="600"
              color="white"
              marginBottom={2}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              fontSize={12}
              color="rgba(255,255,255,0.8)"
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          </YStack>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
