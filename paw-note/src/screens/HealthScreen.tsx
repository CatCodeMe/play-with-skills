import React from 'react';
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
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', icon: 'shield-checkmark', title: '疫苗', color: '#4CAF50' },
  { id: '2', icon: 'bug', title: '驱虫', color: colors.secondary },
  { id: '3', icon: 'nutrition', title: '饮食', color: '#E91E63' },
  { id: '4', icon: 'medkit', title: '疾病', color: '#F44336' },
  { id: '5', icon: 'cut', title: '护理', color: '#9C27B0' },
  { id: '6', icon: 'fitness', title: '运动', color: colors.info },
];

const articles = [
  {
    id: '1',
    title: '新手养狗必看：第一年疫苗全攻略',
    category: '疫苗',
    readTime: '5分钟',
    views: '10.2k',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
  },
  {
    id: '2',
    title: '猫咪不能吃的10种常见食物',
    category: '饮食',
    readTime: '3分钟',
    views: '8.5k',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
  },
  {
    id: '3',
    title: '如何判断宠物是否需要看医生',
    category: '疾病',
    readTime: '4分钟',
    views: '6.8k',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
  },
];

export default function HealthScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* 头部 */}
      <YStack backgroundColor="white" paddingHorizontal={16} paddingVertical={10}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
          <Text fontSize={18} fontWeight="600" color={colors.textPrimary}>
            健康百科
          </Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </XStack>

        {/* 搜索框 */}
        <XStack
          alignItems="center"
          backgroundColor={colors.background}
          borderRadius={6}
          paddingHorizontal={12}
          paddingVertical={8}
          gap={8}
        >
          <Ionicons name="search" size={18} color={colors.textLight} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 14,
              color: colors.textPrimary,
              paddingVertical: 0,
            }}
            placeholder="搜索健康问题"
            placeholderTextColor={colors.textLight}
          />
        </XStack>
      </YStack>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12 }}
      >
        {/* 分类 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8, marginBottom: 20 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} activeOpacity={0.7}>
              <XStack
                alignItems="center"
                backgroundColor="white"
                paddingHorizontal={12}
                paddingVertical={8}
                borderRadius={4}
                gap={6}
              >
                <Ionicons name={cat.icon as any} size={16} color={cat.color} />
                <Text fontSize={12} fontWeight="500" color={colors.textPrimary}>
                  {cat.title}
                </Text>
              </XStack>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 文章列表 */}
        <YStack paddingHorizontal={16}>
          <Text fontSize={15} fontWeight="600" color={colors.textPrimary} marginBottom={12}>
            热门文章
          </Text>

          {articles.map((article) => (
            <TouchableOpacity key={article.id} activeOpacity={0.95}>
              <View
                marginBottom={12}
                backgroundColor="white"
                borderRadius={6}
                overflow="hidden"
              >
                <XStack>
                  <ImageBackground
                    source={{ uri: article.image }}
                    style={{ width: 90, height: 90 }}
                    resizeMode="cover"
                  />
                  
                  <YStack flex={1} padding={10} justifyContent="center">
                    <Text fontSize={10} color={colors.textLight} marginBottom={4}>
                      {article.category}
                    </Text>
                    <Text
                      fontSize={13}
                      fontWeight="500"
                      color={colors.textPrimary}
                      numberOfLines={2}
                      marginBottom={6}
                      lineHeight={18}
                    >
                      {article.title}
                    </Text>
                    <XStack gap={12}>
                      <Text fontSize={10} color={colors.textLight}>
                        {article.readTime}
                      </Text>
                      <Text fontSize={10} color={colors.textLight}>
                        {article.views} 阅读
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
              </View>
            </TouchableOpacity>
          ))}
        </YStack>

        {/* AI 入口 */}
        <View marginHorizontal={16} marginVertical={16}>
          <TouchableOpacity activeOpacity={0.95}>
            <View borderRadius={6} overflow="hidden" height={80}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800' }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                  }}
                >
                  <YStack>
                    <XStack alignItems="center" gap={6} marginBottom={2}>
                      <Ionicons name="sparkles" size={14} color="white" />
                      <Text fontSize={14} fontWeight="600" color="white">
                        AI 健康咨询
                      </Text>
                    </XStack>
                    <Text fontSize={11} color="rgba(255,255,255,0.8)">
                      有问题？直接问 AI
                    </Text>
                  </YStack>
                  <Ionicons name="chevron-forward" size={20} color="white" />
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View height={20} />
      </ScrollView>
    </SafeAreaView>
  );
}
