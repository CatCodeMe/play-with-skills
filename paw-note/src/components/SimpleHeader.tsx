import React from 'react';
import { TouchableOpacity } from 'react-native';
import { XStack, Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface SimpleHeaderProps {
  title?: string;
  onSearchPress?: () => void;
  onAvatarPress?: () => void;
}

export default function SimpleHeader({
  title = '毛孩档案',
  onSearchPress,
  onAvatarPress,
}: SimpleHeaderProps) {
  return (
    <XStack
      paddingHorizontal={16}
      paddingVertical={10}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
    >
      {/* Logo + 标题 */}
      <XStack alignItems="center" gap={6}>
        <Text fontSize={20}>🐾</Text>
        <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
          {title}
        </Text>
      </XStack>

      {/* 右侧操作 */}
      <XStack alignItems="center" gap={8}>
        <TouchableOpacity
          onPress={onSearchPress}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            borderRadius: 4,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="search-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAvatarPress}
          activeOpacity={0.7}
          style={{
            width: 36,
            height: 36,
            borderRadius: 4,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </XStack>
    </XStack>
  );
}
