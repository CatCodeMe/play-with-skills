/**
 * 我的页面 - Cozy Luxe 风格
 * 
 * 设计亮点：
 * - 温暖渐变头部背景
 * - 精致的用户卡片
 * - 成就徽章系统
 * - 分组功能列表
 */

import React from 'react';
import { ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, radius, spacing } from '../theme/colors';

const badges = [
  { id: '1', icon: '🏆', title: '养宠达人', desc: '坚持记录30天', earned: true },
  { id: '2', icon: '💉', title: '疫苗卫士', desc: '按时接种疫苗', earned: true },
  { id: '3', icon: '📷', title: '摄影高手', desc: '上传50张照片', earned: false },
  { id: '4', icon: '🎯', title: '健康达人', desc: '完成10次体检', earned: false },
];

const menuGroups = [
  {
    title: '我的内容',
    items: [
      { icon: 'images', title: '我的相册', badge: '45', color: colors.accent },
      { icon: 'book', title: '养宠日记', badge: '12', color: '#9C7BA8' },
      { icon: 'notifications', title: '提醒管理', badge: '3', color: colors.info },
      { icon: 'stats-chart', title: '健康报告', color: colors.success },
    ],
  },
  {
    title: '更多服务',
    items: [
      { icon: 'star', title: '给个好评', color: colors.accent },
      { icon: 'chatbubble-ellipses', title: '意见反馈', color: colors.secondary },
      { icon: 'help-circle', title: '帮助中心', color: colors.textTertiary },
      { icon: 'information-circle', title: '关于我们', color: colors.textTertiary },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 头部渐变 + 用户信息卡片 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View height={220} marginBottom={50}>
          <LinearGradient
            colors={colors.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          >
            {/* 顶部操作 */}
            <XStack
              paddingHorizontal={spacing.md}
              paddingTop={spacing.sm}
              justifyContent="flex-end"
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
              >
                <Ionicons name="settings-outline" size={20} color="white" />
              </TouchableOpacity>
            </XStack>

            {/* 装饰圆圈 */}
            <View
              position="absolute"
              top={-30}
              left={-50}
              width={180}
              height={180}
              borderRadius={90}
              backgroundColor="rgba(255,255,255,0.08)"
            />
            <View
              position="absolute"
              bottom={40}
              right={-30}
              width={100}
              height={100}
              borderRadius={50}
              backgroundColor="rgba(255,255,255,0.1)"
            />
          </LinearGradient>

          {/* 用户卡片 */}
          <View
            position="absolute"
            bottom={-40}
            left={spacing.md}
            right={spacing.md}
            backgroundColor={colors.surface}
            borderRadius={radius.lg}
            padding={spacing.lg}
            style={shadows.md}
          >
            <XStack alignItems="center">
              {/* 头像 */}
              <View
                width={76}
                height={76}
                borderRadius={38}
                marginRight={spacing.md}
                style={[
                  {
                    borderWidth: 3,
                    borderColor: colors.primaryMuted,
                  },
                  shadows.glow,
                ]}
              >
                <ImageBackground
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
                  style={{ width: '100%', height: '100%', borderRadius: 35 }}
                  imageStyle={{ borderRadius: 35 }}
                />
              </View>

              <YStack flex={1}>
                <Text fontSize={21} fontWeight="700" color={colors.textPrimary}>
                  铲屎官小明
                </Text>
                <XStack alignItems="center" gap={6} marginTop={4}>
                  <View
                    backgroundColor={colors.card.gold}
                    paddingHorizontal={8}
                    paddingVertical={3}
                    borderRadius={radius.xs}
                  >
                    <Text fontSize={11} color={colors.accent} fontWeight="600">
                      LV.5 养宠达人
                    </Text>
                  </View>
                </XStack>
                <Text fontSize={13} color={colors.textSecondary} marginTop={6}>
                  养宠 2 年 · 2 只毛孩
                </Text>
              </YStack>

              <TouchableOpacity activeOpacity={0.7}>
                <View
                  backgroundColor={colors.surfaceVariant}
                  paddingHorizontal={14}
                  paddingVertical={10}
                  borderRadius={radius.full}
                >
                  <Ionicons name="pencil" size={16} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            </XStack>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 数据统计 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View paddingHorizontal={spacing.md} marginBottom={spacing.lg}>
          <View
            backgroundColor={colors.surface}
            borderRadius={radius.lg}
            paddingVertical={spacing.lg}
            style={shadows.sm}
          >
            <XStack>
              {[
                { value: '156', label: '养宠天数', color: colors.primary },
                { value: '45', label: '照片', color: colors.info },
                { value: '12', label: '日记', color: colors.accent },
              ].map((stat, index, arr) => (
                <View
                  key={index}
                  flex={1}
                  alignItems="center"
                  borderRightWidth={index < arr.length - 1 ? 1 : 0}
                  borderRightColor={colors.borderLight}
                >
                  <Text fontSize={26} fontWeight="700" color={stat.color}>
                    {stat.value}
                  </Text>
                  <Text fontSize={12} color={colors.textTertiary} marginTop={4}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </XStack>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 我的徽章 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View paddingHorizontal={spacing.md} marginBottom={spacing.lg}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.md}>
            <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
              我的成就
            </Text>
            <TouchableOpacity>
              <XStack alignItems="center" gap={4}>
                <Text fontSize={13} color={colors.textTertiary}>查看全部</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
              </XStack>
            </TouchableOpacity>
          </XStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap={spacing.sm}>
              {badges.map((badge) => (
                <TouchableOpacity key={badge.id} activeOpacity={0.7}>
                  <View
                    backgroundColor={colors.surface}
                    borderRadius={radius.lg}
                    padding={spacing.md}
                    width={115}
                    alignItems="center"
                    style={[
                      shadows.sm,
                      !badge.earned && { opacity: 0.6 },
                    ]}
                  >
                    <View
                      width={52}
                      height={52}
                      borderRadius={26}
                      backgroundColor={badge.earned ? colors.card.gold : colors.surfaceVariant}
                      alignItems="center"
                      justifyContent="center"
                      marginBottom={spacing.sm}
                    >
                      <Text fontSize={26}>{badge.icon}</Text>
                    </View>
                    <Text
                      fontSize={13}
                      fontWeight="600"
                      color={colors.textPrimary}
                      marginBottom={4}
                    >
                      {badge.title}
                    </Text>
                    <Text
                      fontSize={10}
                      color={colors.textTertiary}
                      textAlign="center"
                    >
                      {badge.desc}
                    </Text>
                    {!badge.earned && (
                      <View
                        position="absolute"
                        top={8}
                        right={8}
                      >
                        <Ionicons name="lock-closed" size={12} color={colors.textLight} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </XStack>
          </ScrollView>
        </View>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 功能菜单 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {menuGroups.map((group, groupIndex) => (
          <View key={groupIndex} paddingHorizontal={spacing.md} marginBottom={spacing.lg}>
            <Text
              fontSize={17}
              fontWeight="700"
              color={colors.textPrimary}
              marginBottom={spacing.md}
            >
              {group.title}
            </Text>

            <View
              backgroundColor={colors.surface}
              borderRadius={radius.lg}
              overflow="hidden"
              style={shadows.sm}
            >
              {group.items.map((item, index, arr) => (
                <TouchableOpacity key={index} activeOpacity={0.7}>
                  <XStack
                    paddingHorizontal={spacing.md}
                    paddingVertical={15}
                    alignItems="center"
                    borderBottomWidth={index < arr.length - 1 ? 1 : 0}
                    borderBottomColor={colors.borderLight}
                  >
                    <View
                      width={38}
                      height={38}
                      borderRadius={radius.md}
                      backgroundColor={item.color + '18'}
                      alignItems="center"
                      justifyContent="center"
                      marginRight={14}
                    >
                      <Ionicons name={item.icon as any} size={18} color={item.color} />
                    </View>
                    <Text flex={1} fontSize={15} color={colors.textPrimary} fontWeight="500">
                      {item.title}
                    </Text>
                    {item.badge && (
                      <View
                        backgroundColor={colors.primaryMuted}
                        paddingHorizontal={10}
                        paddingVertical={3}
                        borderRadius={radius.full}
                        marginRight={spacing.sm}
                      >
                        <Text fontSize={12} color={colors.primary} fontWeight="600">
                          {item.badge}
                        </Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
                  </XStack>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 退出登录 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View paddingHorizontal={spacing.md}>
          <TouchableOpacity activeOpacity={0.7}>
            <View
              backgroundColor={colors.surface}
              borderRadius={radius.lg}
              paddingVertical={15}
              alignItems="center"
              style={[
                shadows.sm,
                { borderWidth: 1, borderColor: colors.errorLight },
              ]}
            >
              <Text fontSize={15} color={colors.error} fontWeight="500">
                退出登录
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
