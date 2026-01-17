/**
 * 我的页面 - 个人中心型
 * - 头像大图
 * - 徽章/成就
 * - 功能列表
 */

import React from 'react';
import { ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

const badges = [
  { id: '1', icon: '🏆', title: '养宠达人', desc: '坚持记录30天' },
  { id: '2', icon: '💉', title: '疫苗卫士', desc: '按时接种疫苗' },
  { id: '3', icon: '📷', title: '摄影高手', desc: '上传50张照片' },
];

const menuGroups = [
  {
    title: '我的内容',
    items: [
      { icon: '📷', title: '我的相册', badge: '45', color: '#FF9800' },
      { icon: '📔', title: '养宠日记', badge: '12', color: '#9C27B0' },
      { icon: '🔔', title: '提醒管理', badge: '3', color: colors.info },
      { icon: '📊', title: '健康报告', color: colors.primary },
    ],
  },
  {
    title: '更多服务',
    items: [
      { icon: '⭐', title: '给个好评', color: '#FFD93D' },
      { icon: '💬', title: '意见反馈', color: colors.secondary },
      { icon: '❓', title: '帮助中心', color: colors.textSecondary },
      { icon: '📋', title: '关于我们', color: colors.textSecondary },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 头部背景 + 用户信息 */}
        <View height={200} marginBottom={60}>
          <LinearGradient
            colors={[colors.primary, colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          >
            {/* 顶部操作 */}
            <XStack
              paddingHorizontal={16}
              paddingTop={8}
              justifyContent="flex-end"
            >
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
          </LinearGradient>

          {/* 用户卡片 */}
          <View
            position="absolute"
            bottom={-50}
            left={16}
            right={16}
            backgroundColor="white"
            borderRadius={16}
            padding={20}
          >
            <XStack alignItems="center">
              {/* 头像 */}
              <View
                width={70}
                height={70}
                borderRadius={35}
                borderWidth={3}
                borderColor="white"
                overflow="hidden"
                marginRight={16}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={8}
                elevation={4}
              >
                <ImageBackground
                  source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              
              <YStack flex={1}>
                <Text fontSize={20} fontWeight="600" color={colors.textPrimary}>
                  铲屎官小明
                </Text>
                <Text fontSize={13} color={colors.textSecondary} marginTop={4}>
                  养宠 2 年 · 2 只毛孩
                </Text>
              </YStack>

              <TouchableOpacity>
                <View
                  backgroundColor={colors.background}
                  paddingHorizontal={14}
                  paddingVertical={8}
                  borderRadius={16}
                >
                  <Text fontSize={12} color={colors.textSecondary}>编辑</Text>
                </View>
              </TouchableOpacity>
            </XStack>
          </View>
        </View>

        {/* 数据统计 */}
        <View paddingHorizontal={16} marginBottom={20}>
          <XStack
            backgroundColor="white"
            borderRadius={16}
            paddingVertical={20}
          >
            <View flex={1} alignItems="center" borderRightWidth={1} borderRightColor={colors.border}>
              <Text fontSize={24} fontWeight="700" color={colors.primary}>156</Text>
              <Text fontSize={12} color={colors.textSecondary} marginTop={4}>养宠天数</Text>
            </View>
            <View flex={1} alignItems="center" borderRightWidth={1} borderRightColor={colors.border}>
              <Text fontSize={24} fontWeight="700" color={colors.info}>45</Text>
              <Text fontSize={12} color={colors.textSecondary} marginTop={4}>照片</Text>
            </View>
            <View flex={1} alignItems="center">
              <Text fontSize={24} fontWeight="700" color={colors.secondary}>12</Text>
              <Text fontSize={12} color={colors.textSecondary} marginTop={4}>日记</Text>
            </View>
          </XStack>
        </View>

        {/* 我的徽章 */}
        <View paddingHorizontal={16} marginBottom={20}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={14}>
            <Text fontSize={16} fontWeight="600" color={colors.textPrimary}>
              我的徽章
            </Text>
            <Text fontSize={12} color={colors.textSecondary}>查看全部</Text>
          </XStack>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap={12}>
              {badges.map((badge) => (
                <View
                  key={badge.id}
                  backgroundColor="white"
                  borderRadius={16}
                  padding={16}
                  width={120}
                  alignItems="center"
                >
                  <View
                    width={50}
                    height={50}
                    borderRadius={25}
                    backgroundColor={colors.accent + '20'}
                    alignItems="center"
                    justifyContent="center"
                    marginBottom={10}
                  >
                    <Text fontSize={24}>{badge.icon}</Text>
                  </View>
                  <Text fontSize={13} fontWeight="500" color={colors.textPrimary} marginBottom={4}>
                    {badge.title}
                  </Text>
                  <Text fontSize={10} color={colors.textLight} textAlign="center">
                    {badge.desc}
                  </Text>
                </View>
              ))}
              
              {/* 更多徽章 */}
              <View
                backgroundColor={colors.background}
                borderRadius={16}
                padding={16}
                width={120}
                alignItems="center"
                justifyContent="center"
                borderWidth={2}
                borderColor={colors.border}
                borderStyle="dashed"
              >
                <Text fontSize={24} marginBottom={8}>🎯</Text>
                <Text fontSize={12} color={colors.textLight}>
                  继续加油
                </Text>
              </View>
            </XStack>
          </ScrollView>
        </View>

        {/* 功能菜单 */}
        {menuGroups.map((group, groupIndex) => (
          <View key={groupIndex} paddingHorizontal={16} marginBottom={20}>
            <Text fontSize={16} fontWeight="600" color={colors.textPrimary} marginBottom={14}>
              {group.title}
            </Text>
            
            <View backgroundColor="white" borderRadius={16} overflow="hidden">
              {group.items.map((item, index) => (
                <TouchableOpacity key={index} activeOpacity={0.7}>
                  <XStack
                    paddingHorizontal={16}
                    paddingVertical={14}
                    alignItems="center"
                    borderBottomWidth={index < group.items.length - 1 ? 1 : 0}
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
                      <Text fontSize={18}>{item.icon}</Text>
                    </View>
                    <Text flex={1} fontSize={14} color={colors.textPrimary}>
                      {item.title}
                    </Text>
                    {item.badge && (
                      <View
                        backgroundColor={colors.primary + '15'}
                        paddingHorizontal={8}
                        paddingVertical={2}
                        borderRadius={10}
                        marginRight={8}
                      >
                        <Text fontSize={11} color={colors.primary} fontWeight="500">
                          {item.badge}
                        </Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
                  </XStack>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* 退出登录 */}
        <View paddingHorizontal={16} marginBottom={40}>
          <TouchableOpacity activeOpacity={0.7}>
            <View
              backgroundColor="white"
              borderRadius={16}
              paddingVertical={14}
              alignItems="center"
            >
              <Text fontSize={14} color="#E53935">退出登录</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
