/**
 * 首页 - 灵动可爱风格
 * - Hero 宠物大图
 * - 宠物切换
 * - 圆润图标
 * - 数据卡片
 */

import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const pets = [
  { 
    id: '1', 
    name: '小美', 
    type: '布偶猫', 
    age: '2岁3个月',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
  },
  { 
    id: '2', 
    name: '大黄', 
    type: '金毛', 
    age: '3岁',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
  },
];

const tools = [
  { id: 'ai', icon: '✨', title: 'AI问答', color: colors.primary, bg: colors.primary + '15' },
  { id: 'vaccine', icon: '💉', title: '疫苗', color: '#4CAF50', bg: '#4CAF5015' },
  { id: 'deworm', icon: '🐛', title: '驱虫', color: colors.secondary, bg: colors.secondary + '15' },
  { id: 'weight', icon: '⚖️', title: '体重', color: colors.info, bg: colors.info + '15' },
  { id: 'diary', icon: '📔', title: '日记', color: '#9C27B0', bg: '#9C27B015' },
  { id: 'album', icon: '📷', title: '相册', color: '#FF9800', bg: '#FF980015' },
];

export default function HomeScreen() {
  const [currentPet, setCurrentPet] = useState(pets[0]);
  const [petSelectorOpen, setPetSelectorOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero 区域 */}
        <View height={280} marginBottom={-40}>
          <ImageBackground
            source={{ uri: currentPet.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']}
              style={{ flex: 1 }}
            >
              {/* 顶部操作栏 */}
              <XStack
                paddingHorizontal={16}
                paddingTop={8}
                justifyContent="space-between"
              >
                <TouchableOpacity
                  onPress={() => setPetSelectorOpen(true)}
                  activeOpacity={0.8}
                >
                  <XStack
                    alignItems="center"
                    backgroundColor="rgba(255,255,255,0.2)"
                    paddingHorizontal={12}
                    paddingVertical={6}
                    borderRadius={20}
                    gap={6}
                  >
                    <View width={24} height={24} borderRadius={12} overflow="hidden">
                      <ImageBackground
                        source={{ uri: currentPet.avatar }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </View>
                    <Text fontSize={13} color="white" fontWeight="500">
                      {currentPet.name}
                    </Text>
                    <Ionicons name="chevron-down" size={14} color="white" />
                  </XStack>
                </TouchableOpacity>
                
                <XStack gap={8}>
                  <TouchableOpacity
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="notifications-outline" size={18} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="settings-outline" size={18} color="white" />
                  </TouchableOpacity>
                </XStack>
              </XStack>

              {/* 底部信息 */}
              <YStack
                position="absolute"
                bottom={50}
                left={16}
                right={16}
              >
                <Text fontSize={24} fontWeight="700" color="white" marginBottom={4}>
                  {getGreeting()} 👋
                </Text>
                <Text fontSize={14} color="rgba(255,255,255,0.9)">
                  {currentPet.name}今天心情不错呢~
                </Text>
              </YStack>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* 主内容区 */}
        <View
          backgroundColor={colors.background}
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          paddingTop={20}
          paddingHorizontal={16}
          minHeight={500}
        >
          {/* 宠物信息卡片 */}
          <View
            backgroundColor="white"
            borderRadius={16}
            padding={16}
            marginBottom={20}
          >
            <XStack alignItems="center" gap={14}>
              <View width={56} height={56} borderRadius={28} overflow="hidden">
                <ImageBackground
                  source={{ uri: currentPet.avatar }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <YStack flex={1}>
                <Text fontSize={18} fontWeight="600" color={colors.textPrimary}>
                  {currentPet.name}
                </Text>
                <Text fontSize={13} color={colors.textSecondary}>
                  {currentPet.type} · {currentPet.age}
                </Text>
              </YStack>
              <TouchableOpacity>
                <View
                  backgroundColor={colors.primary + '15'}
                  paddingHorizontal={14}
                  paddingVertical={8}
                  borderRadius={16}
                >
                  <Text fontSize={12} color={colors.primary} fontWeight="500">
                    编辑资料
                  </Text>
                </View>
              </TouchableOpacity>
            </XStack>

            {/* 数据统计 */}
            <XStack marginTop={16} gap={12}>
              <View flex={1} alignItems="center" paddingVertical={10} backgroundColor={colors.background} borderRadius={12}>
                <Text fontSize={20} fontWeight="600" color={colors.primary}>12</Text>
                <Text fontSize={11} color={colors.textSecondary}>天后驱虫</Text>
              </View>
              <View flex={1} alignItems="center" paddingVertical={10} backgroundColor={colors.background} borderRadius={12}>
                <Text fontSize={20} fontWeight="600" color={colors.info}>4.2</Text>
                <Text fontSize={11} color={colors.textSecondary}>kg 体重</Text>
              </View>
              <View flex={1} alignItems="center" paddingVertical={10} backgroundColor={colors.background} borderRadius={12}>
                <Text fontSize={20} fontWeight="600" color={colors.secondary}>45</Text>
                <Text fontSize={11} color={colors.textSecondary}>张照片</Text>
              </View>
            </XStack>
          </View>

          {/* 功能入口 - 可爱圆润图标 */}
          <View marginBottom={20}>
            <Text fontSize={16} fontWeight="600" color={colors.textPrimary} marginBottom={14}>
              常用功能
            </Text>
            <XStack flexWrap="wrap" gap={12}>
              {tools.map((tool) => (
                <TouchableOpacity
                  key={tool.id}
                  style={{ width: (width - 32 - 24) / 3 }}
                  activeOpacity={0.7}
                >
                  <View
                    backgroundColor="white"
                    borderRadius={16}
                    paddingVertical={16}
                    alignItems="center"
                  >
                    <View
                      width={48}
                      height={48}
                      borderRadius={24}
                      backgroundColor={tool.bg}
                      alignItems="center"
                      justifyContent="center"
                      marginBottom={8}
                    >
                      <Text fontSize={22}>{tool.icon}</Text>
                    </View>
                    <Text fontSize={12} color={colors.textSecondary}>
                      {tool.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </XStack>
          </View>

          {/* 最近动态 */}
          <View marginBottom={20}>
            <XStack justifyContent="space-between" alignItems="center" marginBottom={14}>
              <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
                最近动态
              </Text>
              <Text fontSize={12} color={colors.textSecondary}>查看全部</Text>
            </XStack>
            
            <View backgroundColor="white" borderRadius={16} padding={14}>
              {[
                { icon: '📝', text: '记录了今天的饮食', time: '2小时前', color: '#9C27B0' },
                { icon: '⚖️', text: '更新了体重 4.2kg', time: '昨天', color: colors.info },
                { icon: '✨', text: 'AI分析了便便照片', time: '3天前', color: colors.primary },
              ].map((item, index) => (
                <XStack
                  key={index}
                  alignItems="center"
                  paddingVertical={10}
                  borderBottomWidth={index < 2 ? 1 : 0}
                  borderBottomColor={colors.border}
                >
                  <View
                    width={36}
                    height={36}
                    borderRadius={18}
                    backgroundColor={item.color + '15'}
                    alignItems="center"
                    justifyContent="center"
                    marginRight={12}
                  >
                    <Text fontSize={16}>{item.icon}</Text>
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={13} color={colors.textPrimary}>{item.text}</Text>
                    <Text fontSize={11} color={colors.textLight}>{item.time}</Text>
                  </YStack>
                  <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
                </XStack>
              ))}
            </View>
          </View>

          {/* 最近照片 */}
          <View marginBottom={40}>
            <XStack justifyContent="space-between" alignItems="center" marginBottom={14}>
              <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
                最近照片
              </Text>
              <Text fontSize={12} color={colors.textSecondary}>查看全部</Text>
            </XStack>
            
            <XStack gap={8}>
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  flex={1}
                  height={100}
                  borderRadius={12}
                  overflow="hidden"
                >
                  <ImageBackground
                    source={{ uri: `https://placekitten.com/${200 + i * 20}/${200 + i * 20}` }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              ))}
              <TouchableOpacity style={{ flex: 1 }}>
                <View
                  height={100}
                  borderRadius={12}
                  backgroundColor="white"
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={2}
                  borderColor={colors.border}
                  borderStyle="dashed"
                >
                  <Ionicons name="add" size={28} color={colors.textLight} />
                </View>
              </TouchableOpacity>
            </XStack>
          </View>
        </View>
      </ScrollView>

      {/* 宠物选择器弹窗 */}
      <Modal
        visible={petSelectorOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setPetSelectorOpen(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
          activeOpacity={1}
          onPress={() => setPetSelectorOpen(false)}
        >
          <View
            backgroundColor="white"
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            paddingTop={8}
            paddingBottom={40}
          >
            <View
              width={36}
              height={4}
              borderRadius={2}
              backgroundColor={colors.border}
              alignSelf="center"
              marginBottom={20}
            />
            
            <Text fontSize={17} fontWeight="600" color={colors.textPrimary} paddingHorizontal={20} marginBottom={16}>
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
                  paddingHorizontal={20}
                  paddingVertical={14}
                  alignItems="center"
                  backgroundColor={pet.id === currentPet.id ? colors.primary + '08' : 'white'}
                >
                  <View width={50} height={50} borderRadius={25} overflow="hidden" marginRight={14}>
                    <ImageBackground
                      source={{ uri: pet.avatar }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                  <YStack flex={1}>
                    <Text fontSize={15} fontWeight="500" color={colors.textPrimary}>
                      {pet.name}
                    </Text>
                    <Text fontSize={12} color={colors.textSecondary}>
                      {pet.type} · {pet.age}
                    </Text>
                  </YStack>
                  {pet.id === currentPet.id && (
                    <View
                      width={24}
                      height={24}
                      borderRadius={12}
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

            <TouchableOpacity activeOpacity={0.7}>
              <XStack
                paddingHorizontal={20}
                paddingVertical={16}
                alignItems="center"
                justifyContent="center"
                gap={8}
                marginTop={8}
              >
                <View
                  width={40}
                  height={40}
                  borderRadius={20}
                  backgroundColor={colors.background}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Ionicons name="add" size={22} color={colors.primary} />
                </View>
                <Text fontSize={14} color={colors.primary} fontWeight="500">添加新宠物</Text>
              </XStack>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
