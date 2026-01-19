/**
 * 首页 - Cozy Luxe 风格
 * 
 * 设计亮点：
 * - 大面积暖调渐变头部
 * - 精致的宠物卡片（带光晕效果）
 * - 圆润可爱的功能图标
 * - 柔和的卡片阴影
 * - 呼吸感微动画
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadows, radius, spacing } from '../theme/colors';

const { width } = Dimensions.get('window');

const pets = [
  {
    id: '1',
    name: '小美',
    type: '布偶猫',
    age: '2岁3个月',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
    mood: '😊',
    moodText: '心情不错',
  },
  {
    id: '2',
    name: '大黄',
    type: '金毛',
    age: '3岁',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
    mood: '🥰',
    moodText: '超级开心',
  },
];

// 功能入口数据 - 使用品牌色系
const tools = [
  {
    id: 'ai',
    icon: '✨',
    title: 'AI问诊',
    subtitle: '智能分析',
    gradient: ['#C4946A', '#E6A44E'],
    featured: true,
  },
  {
    id: 'vaccine',
    icon: '💉',
    title: '疫苗',
    subtitle: '接种提醒',
    color: colors.success,
    bg: colors.successLight,
  },
  {
    id: 'deworm',
    icon: '🐛',
    title: '驱虫',
    subtitle: '定期防护',
    color: colors.secondary,
    bg: colors.secondaryLight,
  },
  {
    id: 'weight',
    icon: '⚖️',
    title: '体重',
    subtitle: '成长曲线',
    color: colors.info,
    bg: colors.infoLight,
  },
  {
    id: 'diary',
    icon: '📔',
    title: '日记',
    subtitle: '记录点滴',
    color: '#9C7BA8',
    bg: '#F5EEF8',
  },
  {
    id: 'album',
    icon: '📷',
    title: '相册',
    subtitle: '美好瞬间',
    color: colors.accent,
    bg: colors.card.gold,
  },
];

// 呼吸动画 Hook
const useBreathingAnimation = (duration = 2000) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.02,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    );
    breathe.start();
    return () => breathe.stop();
  }, []);

  return animatedValue;
};

export default function HomeScreen() {
  const [currentPet, setCurrentPet] = useState(pets[0]);
  const [petSelectorOpen, setPetSelectorOpen] = useState(false);
  const breatheScale = useBreathingAnimation(2500);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return '夜深了';
    if (hour < 12) return '早上好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* Hero 区域 - 渐变头部 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View height={300} marginBottom={-60}>
          <LinearGradient
            colors={colors.gradient.sunset}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, paddingTop: 8 }}
          >
            {/* 顶部操作栏 */}
            <XStack
              paddingHorizontal={spacing.md}
              justifyContent="space-between"
              alignItems="center"
            >
              {/* 宠物切换按钮 */}
              <TouchableOpacity
                onPress={() => setPetSelectorOpen(true)}
                activeOpacity={0.8}
              >
                <XStack
                  alignItems="center"
                  backgroundColor="rgba(255,255,255,0.25)"
                  paddingHorizontal={14}
                  paddingVertical={8}
                  borderRadius={radius.full}
                  gap={8}
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                  }}
                >
                  <View
                    width={28}
                    height={28}
                    borderRadius={14}
                    overflow="hidden"
                    style={{
                      borderWidth: 2,
                      borderColor: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    <ImageBackground
                      source={{ uri: currentPet.avatar }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <Text fontSize={14} color="white" fontWeight="600">
                    {currentPet.name}
                  </Text>
                  <View
                    backgroundColor="rgba(255,255,255,0.3)"
                    width={20}
                    height={20}
                    borderRadius={10}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons name="chevron-down" size={12} color="white" />
                  </View>
                </XStack>
              </TouchableOpacity>

              {/* 右侧操作 */}
              <XStack gap={10}>
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
                  <Ionicons name="notifications-outline" size={20} color="white" />
                </TouchableOpacity>
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
                  <Ionicons name="scan-outline" size={20} color="white" />
                </TouchableOpacity>
              </XStack>
            </XStack>

            {/* 问候语区域 */}
            <YStack
              position="absolute"
              bottom={80}
              left={spacing.lg}
              right={spacing.lg}
            >
              <XStack alignItems="center" gap={8} marginBottom={6}>
                <Text fontSize={28} fontWeight="700" color="white">
                  {getGreeting()}
                </Text>
                <Text fontSize={26}>☀️</Text>
              </XStack>
              <Text fontSize={15} color="rgba(255,255,255,0.9)" lineHeight={22}>
                {currentPet.name}今天{currentPet.moodText}呢 {currentPet.mood}
              </Text>
            </YStack>

            {/* 装饰圆圈 */}
            <View
              position="absolute"
              top={-20}
              right={-40}
              width={160}
              height={160}
              borderRadius={80}
              backgroundColor="rgba(255,255,255,0.1)"
            />
            <View
              position="absolute"
              top={60}
              right={20}
              width={80}
              height={80}
              borderRadius={40}
              backgroundColor="rgba(255,255,255,0.08)"
            />
          </LinearGradient>
        </View>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 主内容区 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View
          backgroundColor={colors.background}
          borderTopLeftRadius={radius.xl}
          borderTopRightRadius={radius.xl}
          paddingTop={spacing.lg}
          paddingHorizontal={spacing.md}
          marginTop={-20}
        >
          {/* ───────────────────────────────────────────────────────── */}
          {/* 宠物信息卡片 - 带呼吸动画 */}
          {/* ───────────────────────────────────────────────────────── */}
          <Animated.View
            style={[
              {
                backgroundColor: colors.surface,
                borderRadius: radius.lg,
                padding: spacing.md,
                marginBottom: spacing.lg,
                transform: [{ scale: breatheScale }],
              },
              shadows.md,
            ]}
          >
            <XStack alignItems="center" gap={16}>
              {/* 宠物头像 - 带光晕 */}
              <View
                width={72}
                height={72}
                borderRadius={36}
                style={[
                  {
                    borderWidth: 3,
                    borderColor: colors.primaryMuted,
                  },
                  shadows.glow,
                ]}
              >
                <ImageBackground
                  source={{ uri: currentPet.avatar }}
                  style={{ width: '100%', height: '100%', borderRadius: 33 }}
                  imageStyle={{ borderRadius: 33 }}
                />
              </View>

              <YStack flex={1}>
                <XStack alignItems="center" gap={8} marginBottom={4}>
                  <Text fontSize={20} fontWeight="700" color={colors.textPrimary}>
                    {currentPet.name}
                  </Text>
                  <View
                    backgroundColor={colors.card.gold}
                    paddingHorizontal={8}
                    paddingVertical={3}
                    borderRadius={radius.xs}
                  >
                    <Text fontSize={11} color={colors.accent} fontWeight="600">
                      {currentPet.mood} {currentPet.moodText}
                    </Text>
                  </View>
                </XStack>
                <Text fontSize={14} color={colors.textSecondary}>
                  {currentPet.type} · {currentPet.age}
                </Text>
              </YStack>

              <TouchableOpacity activeOpacity={0.7}>
                <LinearGradient
                  colors={colors.gradient.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: radius.full,
                  }}
                >
                  <Text fontSize={13} color="white" fontWeight="600">
                    查看档案
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </XStack>

            {/* 数据统计条 */}
            <XStack marginTop={spacing.md} gap={spacing.sm}>
              {[
                { value: '12', label: '天后驱虫', color: colors.primary },
                { value: '4.2kg', label: '体重', color: colors.info },
                { value: '45', label: '张照片', color: colors.accent },
              ].map((stat, index) => (
                <View
                  key={index}
                  flex={1}
                  alignItems="center"
                  paddingVertical={12}
                  backgroundColor={colors.surfaceVariant}
                  borderRadius={radius.md}
                >
                  <Text fontSize={18} fontWeight="700" color={stat.color}>
                    {stat.value}
                  </Text>
                  <Text fontSize={11} color={colors.textTertiary} marginTop={2}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </XStack>
          </Animated.View>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 功能入口网格 */}
          {/* ───────────────────────────────────────────────────────── */}
          <View marginBottom={spacing.lg}>
            <Text
              fontSize={17}
              fontWeight="700"
              color={colors.textPrimary}
              marginBottom={spacing.md}
            >
              常用功能
            </Text>

            <XStack flexWrap="wrap" gap={spacing.sm}>
              {tools.map((tool) => (
                <TouchableOpacity
                  key={tool.id}
                  style={{ width: (width - 32 - 16) / 3 }}
                  activeOpacity={0.7}
                >
                  {tool.featured ? (
                    // AI 功能特殊样式 - 渐变卡片
                    <LinearGradient
                      colors={tool.gradient || []}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: radius.lg,
                        paddingVertical: 18,
                        alignItems: 'center',
                        ...shadows.glow,
                      }}
                    >
                      <View
                        width={44}
                        height={44}
                        borderRadius={22}
                        backgroundColor="rgba(255,255,255,0.3)"
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={8}
                      >
                        <Text fontSize={22}>{tool.icon}</Text>
                      </View>
                      <Text fontSize={13} fontWeight="600" color="white">
                        {tool.title}
                      </Text>
                      <Text fontSize={10} color="rgba(255,255,255,0.8)" marginTop={2}>
                        {tool.subtitle}
                      </Text>
                    </LinearGradient>
                  ) : (
                    // 普通功能卡片
                    <View
                      backgroundColor={colors.surface}
                      borderRadius={radius.lg}
                      paddingVertical={18}
                      alignItems="center"
                      style={shadows.sm}
                    >
                      <View
                        width={44}
                        height={44}
                        borderRadius={22}
                        backgroundColor={tool.bg}
                        alignItems="center"
                        justifyContent="center"
                        marginBottom={8}
                      >
                        <Text fontSize={22}>{tool.icon}</Text>
                      </View>
                      <Text fontSize={13} color={colors.textPrimary} fontWeight="500">
                        {tool.title}
                      </Text>
                      <Text fontSize={10} color={colors.textTertiary} marginTop={2}>
                        {tool.subtitle}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </XStack>
          </View>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 最近动态 */}
          {/* ───────────────────────────────────────────────────────── */}
          <View marginBottom={spacing.lg}>
            <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.md}>
              <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
                最近动态
              </Text>
              <TouchableOpacity>
                <XStack alignItems="center" gap={4}>
                  <Text fontSize={13} color={colors.textTertiary}>查看全部</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
                </XStack>
              </TouchableOpacity>
            </XStack>

            <View
              backgroundColor={colors.surface}
              borderRadius={radius.lg}
              overflow="hidden"
              style={shadows.sm}
            >
              {[
                {
                  icon: '📝',
                  text: '记录了今天的饮食',
                  time: '2小时前',
                  color: '#9C7BA8',
                  bg: '#F5EEF8',
                },
                {
                  icon: '⚖️',
                  text: '体重更新至 4.2kg',
                  time: '昨天',
                  color: colors.info,
                  bg: colors.infoLight,
                },
                {
                  icon: '✨',
                  text: 'AI 分析了便便照片',
                  time: '3天前',
                  color: colors.primary,
                  bg: colors.primaryMuted,
                },
              ].map((item, index, arr) => (
                <TouchableOpacity key={index} activeOpacity={0.7}>
                  <XStack
                    paddingHorizontal={spacing.md}
                    paddingVertical={14}
                    alignItems="center"
                    borderBottomWidth={index < arr.length - 1 ? 1 : 0}
                    borderBottomColor={colors.borderLight}
                  >
                    <View
                      width={40}
                      height={40}
                      borderRadius={radius.md}
                      backgroundColor={item.bg}
                      alignItems="center"
                      justifyContent="center"
                      marginRight={14}
                    >
                      <Text fontSize={18}>{item.icon}</Text>
                    </View>
                    <YStack flex={1}>
                      <Text fontSize={14} color={colors.textPrimary} fontWeight="500">
                        {item.text}
                      </Text>
                      <Text fontSize={12} color={colors.textTertiary} marginTop={2}>
                        {item.time}
                      </Text>
                    </YStack>
                    <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
                  </XStack>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ───────────────────────────────────────────────────────── */}
          {/* 最近照片 */}
          {/* ───────────────────────────────────────────────────────── */}
          <View marginBottom={spacing.lg}>
            <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.md}>
              <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
                最近照片
              </Text>
              <TouchableOpacity>
                <XStack alignItems="center" gap={4}>
                  <Text fontSize={13} color={colors.textTertiary}>查看全部</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
                </XStack>
              </TouchableOpacity>
            </XStack>

            <XStack gap={spacing.sm}>
              {[
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300',
                'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300',
                'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300',
              ].map((uri, i) => (
                <TouchableOpacity
                  key={i}
                  style={{ flex: 1 }}
                  activeOpacity={0.9}
                >
                  <View
                    height={110}
                    borderRadius={radius.md}
                    overflow="hidden"
                    style={shadows.sm}
                  >
                    <ImageBackground
                      source={{ uri }}
                      style={{ width: '100%', height: '100%' }}
                      imageStyle={{ borderRadius: radius.md }}
                    />
                  </View>
                </TouchableOpacity>
              ))}

              {/* 添加按钮 */}
              <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.7}>
                <View
                  height={110}
                  borderRadius={radius.md}
                  backgroundColor={colors.surface}
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    borderWidth: 2,
                    borderColor: colors.border,
                    borderStyle: 'dashed',
                  }}
                >
                  <View
                    width={36}
                    height={36}
                    borderRadius={18}
                    backgroundColor={colors.primaryMuted}
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={6}
                  >
                    <Ionicons name="add" size={22} color={colors.primary} />
                  </View>
                  <Text fontSize={11} color={colors.textTertiary}>添加</Text>
                </View>
              </TouchableOpacity>
            </XStack>
          </View>
        </View>
      </ScrollView>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 宠物选择器弹窗 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Modal
        visible={petSelectorOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setPetSelectorOpen(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(61,47,37,0.4)',
            justifyContent: 'flex-end'
          }}
          activeOpacity={1}
          onPress={() => setPetSelectorOpen(false)}
        >
          <View
            backgroundColor={colors.surface}
            borderTopLeftRadius={radius.xl}
            borderTopRightRadius={radius.xl}
            paddingTop={spacing.sm}
            paddingBottom={40}
          >
            {/* 拖拽指示器 */}
            <View
              width={40}
              height={4}
              borderRadius={2}
              backgroundColor={colors.border}
              alignSelf="center"
              marginBottom={spacing.lg}
            />

            <Text
              fontSize={18}
              fontWeight="700"
              color={colors.textPrimary}
              paddingHorizontal={spacing.lg}
              marginBottom={spacing.md}
            >
              切换宠物
            </Text>

            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                onPress={() => {
                  setCurrentPet(pet);
                  setPetSelectorOpen(false);
                }}
                activeOpacity={0.7}
              >
                <XStack
                  paddingHorizontal={spacing.lg}
                  paddingVertical={14}
                  alignItems="center"
                  backgroundColor={pet.id === currentPet.id ? colors.primaryMuted : colors.surface}
                >
                  <View
                    width={56}
                    height={56}
                    borderRadius={28}
                    overflow="hidden"
                    marginRight={16}
                    style={{
                      borderWidth: 2,
                      borderColor: pet.id === currentPet.id ? colors.primary : colors.border,
                    }}
                  >
                    <ImageBackground
                      source={{ uri: pet.avatar }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
                      {pet.name}
                    </Text>
                    <Text fontSize={13} color={colors.textSecondary}>
                      {pet.type} · {pet.age}
                    </Text>
                  </YStack>
                  {pet.id === currentPet.id && (
                    <View
                      width={26}
                      height={26}
                      borderRadius={13}
                      backgroundColor={colors.primary}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  )}
                </XStack>
              </TouchableOpacity>
            ))}

            {/* 添加宠物 */}
            <TouchableOpacity activeOpacity={0.7}>
              <XStack
                paddingHorizontal={spacing.lg}
                paddingVertical={18}
                alignItems="center"
                justifyContent="center"
                gap={10}
                marginTop={spacing.sm}
              >
                <View
                  width={44}
                  height={44}
                  borderRadius={22}
                  backgroundColor={colors.surfaceVariant}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Ionicons name="add" size={24} color={colors.primary} />
                </View>
                <Text fontSize={15} color={colors.primary} fontWeight="600">
                  添加新宠物
                </Text>
              </XStack>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
