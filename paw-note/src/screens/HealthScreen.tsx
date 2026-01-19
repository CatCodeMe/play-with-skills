/**
 * 发现页面 - Cozy Luxe 风格
 * 
 * 设计亮点：
 * - 温暖的搜索框设计
 * - 精美的分类标签
 * - 高质量文章卡片
 * - AI 入口渐变横幅
 */

import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ImageBackground,
} from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows, radius, spacing } from '../theme/colors';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'all', title: '全部', active: true },
  { id: '1', icon: 'shield-checkmark', title: '疫苗', color: colors.success },
  { id: '2', icon: 'bug', title: '驱虫', color: colors.secondary },
  { id: '3', icon: 'nutrition', title: '饮食', color: '#E85D75' },
  { id: '4', icon: 'medkit', title: '疾病', color: colors.error },
  { id: '5', icon: 'cut', title: '护理', color: '#9C7BA8' },
  { id: '6', icon: 'fitness', title: '运动', color: colors.info },
];

const featuredArticle = {
  id: 'featured',
  title: '春季养宠必读：如何帮毛孩安全度过换毛期',
  category: '护理',
  readTime: '6分钟',
  views: '15.8k',
  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
  description: '专业兽医分享的换毛期护理技巧，减少毛发到处飞...',
};

const articles = [
  {
    id: '1',
    title: '新手养狗必看：第一年疫苗接种全攻略',
    category: '疫苗',
    categoryColor: colors.success,
    readTime: '5分钟',
    views: '10.2k',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
  },
  {
    id: '2',
    title: '猫咪绝对不能吃的10种常见食物',
    category: '饮食',
    categoryColor: '#E85D75',
    readTime: '3分钟',
    views: '8.5k',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
  },
  {
    id: '3',
    title: '如何判断宠物是否需要看医生？这些信号别忽略',
    category: '疾病',
    categoryColor: colors.error,
    readTime: '4分钟',
    views: '6.8k',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
  },
  {
    id: '4',
    title: '宠物体重管理：科学喂养让毛孩更健康',
    category: '饮食',
    categoryColor: '#E85D75',
    readTime: '5分钟',
    views: '5.2k',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
  },
];

export default function HealthScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* 头部 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <View backgroundColor={colors.surface} paddingHorizontal={spacing.md} paddingTop={spacing.sm} paddingBottom={spacing.md}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.md}>
          <Text fontSize={22} fontWeight="700" color={colors.textPrimary}>
            发现
          </Text>
          <TouchableOpacity>
            <View
              width={38}
              height={38}
              borderRadius={19}
              backgroundColor={colors.surfaceVariant}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="bookmark-outline" size={18} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </XStack>

        {/* 搜索框 */}
        <View
          backgroundColor={colors.surfaceVariant}
          borderRadius={radius.md}
          paddingHorizontal={spacing.md}
          paddingVertical={spacing.sm}
        >
          <XStack alignItems="center" gap={spacing.sm}>
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <TextInput
              style={{
                flex: 1,
                fontSize: 15,
                color: colors.textPrimary,
                paddingVertical: 4,
              }}
              placeholder="搜索健康问题、疾病、护理知识..."
              placeholderTextColor={colors.textLight}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </XStack>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 分类标签 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            gap: spacing.sm,
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setActiveCategory(cat.id)}
              >
                {isActive ? (
                  <LinearGradient
                    colors={colors.gradient.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      borderRadius: radius.full,
                      gap: 6,
                    }}
                  >
                    {cat.icon && (
                      <Ionicons name={cat.icon as any} size={14} color="white" />
                    )}
                    <Text fontSize={13} fontWeight="600" color="white">
                      {cat.title}
                    </Text>
                  </LinearGradient>
                ) : (
                  <XStack
                    alignItems="center"
                    backgroundColor={colors.surface}
                    paddingHorizontal={14}
                    paddingVertical={10}
                    borderRadius={radius.full}
                    gap={6}
                    style={shadows.sm}
                  >
                    {cat.icon && (
                      <Ionicons name={cat.icon as any} size={14} color={cat.color} />
                    )}
                    <Text fontSize={13} fontWeight="500" color={colors.textPrimary}>
                      {cat.title}
                    </Text>
                  </XStack>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* AI 健康咨询入口 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View paddingHorizontal={spacing.md} marginBottom={spacing.lg}>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={colors.gradient.ai}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: radius.lg,
                padding: spacing.md,
                ...shadows.glow,
              }}
            >
              <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" flex={1} gap={spacing.md}>
                  <View
                    width={50}
                    height={50}
                    borderRadius={25}
                    backgroundColor="rgba(255,255,255,0.25)"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize={26}>✨</Text>
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={17} fontWeight="700" color="white" marginBottom={4}>
                      AI 健康咨询
                    </Text>
                    <Text fontSize={13} color="rgba(255,255,255,0.85)">
                      有问题？拍照或描述症状，AI 帮你分析
                    </Text>
                  </YStack>
                </XStack>
                <View
                  width={36}
                  height={36}
                  borderRadius={18}
                  backgroundColor="rgba(255,255,255,0.25)"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Ionicons name="chevron-forward" size={18} color="white" />
                </View>
              </XStack>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 精选文章 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View paddingHorizontal={spacing.md} marginBottom={spacing.lg}>
          <Text fontSize={17} fontWeight="700" color={colors.textPrimary} marginBottom={spacing.md}>
            精选推荐
          </Text>

          <TouchableOpacity activeOpacity={0.9}>
            <View
              borderRadius={radius.lg}
              overflow="hidden"
              style={shadows.md}
            >
              <ImageBackground
                source={{ uri: featuredArticle.image }}
                style={{ width: '100%', height: 200 }}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['transparent', 'rgba(61,47,37,0.85)']}
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    padding: spacing.md,
                  }}
                >
                  <View
                    backgroundColor="rgba(255,255,255,0.2)"
                    paddingHorizontal={10}
                    paddingVertical={4}
                    borderRadius={radius.xs}
                    alignSelf="flex-start"
                    marginBottom={spacing.sm}
                  >
                    <Text fontSize={11} color="white" fontWeight="600">
                      {featuredArticle.category}
                    </Text>
                  </View>
                  <Text
                    fontSize={18}
                    fontWeight="700"
                    color="white"
                    marginBottom={6}
                    numberOfLines={2}
                  >
                    {featuredArticle.title}
                  </Text>
                  <XStack alignItems="center" gap={spacing.md}>
                    <XStack alignItems="center" gap={4}>
                      <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
                      <Text fontSize={11} color="rgba(255,255,255,0.8)">
                        {featuredArticle.readTime}
                      </Text>
                    </XStack>
                    <XStack alignItems="center" gap={4}>
                      <Ionicons name="eye-outline" size={12} color="rgba(255,255,255,0.8)" />
                      <Text fontSize={11} color="rgba(255,255,255,0.8)">
                        {featuredArticle.views} 阅读
                      </Text>
                    </XStack>
                  </XStack>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 热门文章列表 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <View paddingHorizontal={spacing.md}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.md}>
            <Text fontSize={17} fontWeight="700" color={colors.textPrimary}>
              热门文章
            </Text>
            <TouchableOpacity>
              <XStack alignItems="center" gap={4}>
                <Text fontSize={13} color={colors.textTertiary}>查看全部</Text>
                <Ionicons name="chevron-forward" size={14} color={colors.textTertiary} />
              </XStack>
            </TouchableOpacity>
          </XStack>

          {articles.map((article, index) => (
            <TouchableOpacity
              key={article.id}
              activeOpacity={0.9}
              style={{ marginBottom: index < articles.length - 1 ? spacing.sm : 0 }}
            >
              <View
                backgroundColor={colors.surface}
                borderRadius={radius.md}
                overflow="hidden"
                style={shadows.sm}
              >
                <XStack>
                  <View width={100} height={100}>
                    <ImageBackground
                      source={{ uri: article.image }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  </View>

                  <YStack flex={1} padding={spacing.sm} justifyContent="center">
                    <View
                      backgroundColor={article.categoryColor + '18'}
                      paddingHorizontal={8}
                      paddingVertical={3}
                      borderRadius={radius.xs}
                      alignSelf="flex-start"
                      marginBottom={6}
                    >
                      <Text fontSize={10} color={article.categoryColor} fontWeight="600">
                        {article.category}
                      </Text>
                    </View>
                    <Text
                      fontSize={14}
                      fontWeight="600"
                      color={colors.textPrimary}
                      numberOfLines={2}
                      lineHeight={20}
                      marginBottom={8}
                    >
                      {article.title}
                    </Text>
                    <XStack alignItems="center" gap={spacing.md}>
                      <XStack alignItems="center" gap={4}>
                        <Ionicons name="time-outline" size={11} color={colors.textTertiary} />
                        <Text fontSize={11} color={colors.textTertiary}>
                          {article.readTime}
                        </Text>
                      </XStack>
                      <XStack alignItems="center" gap={4}>
                        <Ionicons name="eye-outline" size={11} color={colors.textTertiary} />
                        <Text fontSize={11} color={colors.textTertiary}>
                          {article.views}
                        </Text>
                      </XStack>
                    </XStack>
                  </YStack>
                </XStack>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
