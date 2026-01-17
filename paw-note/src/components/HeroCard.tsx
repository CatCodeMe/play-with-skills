import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { YStack, Text, View } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = 200;

interface HeroCardProps {
  imageUrl?: string;
  greeting?: string;
  subtitle?: string;
  petName?: string;
}

export default function HeroCard({
  imageUrl = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
  greeting,
  subtitle = '今天也要好好照顾毛孩哦 ✨',
  petName,
}: HeroCardProps) {
  const getGreeting = () => {
    if (greeting) return greeting;
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <View
      marginHorizontal={16}
      marginBottom={20}
      borderRadius={8}
      overflow="hidden"
      height={HERO_HEIGHT}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.55)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
          }}
        />
        
        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          padding={16}
        >
          <Text
            fontSize={24}
            fontWeight="600"
            color="white"
            marginBottom={2}
          >
            {getGreeting()}，铲屎官
          </Text>
          <Text fontSize={14} color="rgba(255,255,255,0.85)">
            {petName ? `${petName}在等你呢` : subtitle}
          </Text>
        </YStack>
      </ImageBackground>
    </View>
  );
}
