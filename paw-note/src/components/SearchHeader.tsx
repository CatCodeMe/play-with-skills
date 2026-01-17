import React from 'react';
import { XStack, Input, Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

interface SearchHeaderProps {
  onSearchPress?: () => void;
  onAvatarPress?: () => void;
}

export default function SearchHeader({
  onSearchPress,
  onAvatarPress,
}: SearchHeaderProps) {
  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      backgroundColor="$background"
      gap="$3"
    >
      {/* 搜索框 - AI 入口 */}
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={onSearchPress}
      >
        <XStack
          flex={1}
          alignItems="center"
          backgroundColor="$surface"
          paddingHorizontal="$3"
          paddingVertical="$2.5"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$borderColor"
          gap="$2"
        >
          <Ionicons name="search-outline" size={18} color={colors.textLight} />
          <Text flex={1} color="$textLight" fontSize="$3">
            问问 AI...
          </Text>
          <View
            backgroundColor={colors.primary + '15'}
            padding="$1.5"
            borderRadius="$2"
          >
            <Ionicons name="sparkles" size={12} color={colors.primary} />
          </View>
        </XStack>
      </TouchableOpacity>

      {/* Logo */}
      <Text fontSize="$6">🐾</Text>

      {/* 头像 */}
      <TouchableOpacity activeOpacity={0.8} onPress={onAvatarPress}>
        <Ionicons
          name="person-circle-outline"
          size={32}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </XStack>
  );
}
