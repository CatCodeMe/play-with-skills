import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { XStack, Text, View } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { quickActions } from '../data/mockData';

interface QuickActionsProps {
  onPress?: (id: string) => void;
}

export default function QuickActions({ onPress }: QuickActionsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
      }}
    >
      {quickActions.map((action) => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.7}
          onPress={() => onPress?.(action.id)}
        >
          <XStack
            alignItems="center"
            backgroundColor="white"
            paddingHorizontal={12}
            paddingVertical={8}
            borderRadius={4}
            gap={6}
          >
            <Ionicons
              name={action.icon as any}
              size={16}
              color={action.color}
            />
            <Text fontSize={12} fontWeight="500" color={colors.textPrimary}>
              {action.title}
            </Text>
          </XStack>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
