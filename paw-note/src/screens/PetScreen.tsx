import React from 'react';
import {
        View,
        Text,
        StyleSheet,
        ScrollView,
        TouchableOpacity,
        Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function PetScreen() {
        // 获取问候语
        const getGreeting = () => {
                const hour = new Date().getHours();
                if (hour < 12) return '早上好';
                if (hour < 18) return '下午好';
                return '晚上好';
        };

        return (
                <View style={styles.container}>
                        {/* 渐变头部 */}
                        <LinearGradient
                                colors={[colors.primary, colors.primaryLight]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.headerGradient}
                        >
                                <SafeAreaView edges={['top']}>
                                        <View style={styles.headerContent}>
                                                <View>
                                                        <Text style={styles.greeting}>{getGreeting()} 👋</Text>
                                                        <Text style={styles.headerTitle}>我的毛孩</Text>
                                                </View>
                                                <TouchableOpacity style={styles.settingsButton}>
                                                        <Ionicons name="settings-outline" size={24} color="#FFF" />
                                                </TouchableOpacity>
                                        </View>
                                </SafeAreaView>
                        </LinearGradient>

                        <ScrollView
                                style={styles.content}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContent}
                        >
                                {/* 添加宠物卡片 - 精美版 */}
                                <TouchableOpacity activeOpacity={0.9}>
                                        <LinearGradient
                                                colors={['#FFF5F5', '#FFF0F0']}
                                                style={styles.addPetCard}
                                        >
                                                <View style={styles.addPetIconContainer}>
                                                        <LinearGradient
                                                                colors={[colors.primary, colors.primaryDark]}
                                                                style={styles.addPetIconBg}
                                                        >
                                                                <Ionicons name="add" size={32} color="#FFF" />
                                                        </LinearGradient>
                                                </View>
                                                <Text style={styles.addPetTitle}>添加你的毛孩</Text>
                                                <Text style={styles.addPetSubtitle}>
                                                        记录它的每一个珍贵瞬间
                                                </Text>
                                                <View style={styles.addPetButton}>
                                                        <Text style={styles.addPetButtonText}>开始添加</Text>
                                                        <Ionicons name="arrow-forward" size={16} color={colors.primary} />
                                                </View>
                                        </LinearGradient>
                                </TouchableOpacity>

                                {/* 功能入口 */}
                                <View style={styles.quickActions}>
                                        <Text style={styles.sectionTitle}>快捷功能</Text>
                                        <View style={styles.actionGrid}>
                                                <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
                                                        <LinearGradient
                                                                colors={['#E8F5E9', '#C8E6C9']}
                                                                style={styles.actionIconBg}
                                                        >
                                                                <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
                                                        </LinearGradient>
                                                        <Text style={styles.actionLabel}>疫苗提醒</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
                                                        <LinearGradient
                                                                colors={['#E3F2FD', '#BBDEFB']}
                                                                style={styles.actionIconBg}
                                                        >
                                                                <Ionicons name="medical-outline" size={24} color="#2196F3" />
                                                        </LinearGradient>
                                                        <Text style={styles.actionLabel}>健康档案</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
                                                        <LinearGradient
                                                                colors={['#FFF3E0', '#FFE0B2']}
                                                                style={styles.actionIconBg}
                                                        >
                                                                <Ionicons name="nutrition-outline" size={24} color="#FF9800" />
                                                        </LinearGradient>
                                                        <Text style={styles.actionLabel}>饮食记录</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
                                                        <LinearGradient
                                                                colors={['#FCE4EC', '#F8BBD9']}
                                                                style={styles.actionIconBg}
                                                        >
                                                                <Ionicons name="camera-outline" size={24} color="#E91E63" />
                                                        </LinearGradient>
                                                        <Text style={styles.actionLabel}>相册</Text>
                                                </TouchableOpacity>
                                        </View>
                                </View>

                                {/* 每日小贴士 */}
                                <View style={styles.tipSection}>
                                        <Text style={styles.sectionTitle}>今日小贴士</Text>
                                        <LinearGradient
                                                colors={[colors.secondary + '20', colors.secondary + '10']}
                                                style={styles.tipCard}
                                        >
                                                <View style={styles.tipHeader}>
                                                        <Text style={styles.tipEmoji}>💡</Text>
                                                        <Text style={styles.tipTag}>健康提醒</Text>
                                                </View>
                                                <Text style={styles.tipTitle}>春季驱虫注意事项</Text>
                                                <Text style={styles.tipContent}>
                                                        春季是寄生虫活跃的季节，建议每月进行一次体外驱虫，每三个月进行一次体内驱虫。
                                                </Text>
                                                <TouchableOpacity style={styles.tipButton}>
                                                        <Text style={styles.tipButtonText}>了解更多</Text>
                                                </TouchableOpacity>
                                        </LinearGradient>
                                </View>

                                {/* 底部留白 */}
                                <View style={{ height: 30 }} />
                        </ScrollView>
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: colors.background,
        },
        headerGradient: {
                paddingBottom: 20,
        },
        headerContent: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: 12,
        },
        greeting: {
                fontSize: 14,
                color: 'rgba(255,255,255,0.9)',
                marginBottom: 4,
        },
        headerTitle: {
                fontSize: 28,
                fontWeight: '700',
                color: '#FFF',
        },
        settingsButton: {
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
        },
        content: {
                flex: 1,
                marginTop: -10,
        },
        scrollContent: {
                paddingHorizontal: 16,
                paddingTop: 10,
        },
        addPetCard: {
                borderRadius: 20,
                padding: 24,
                alignItems: 'center',
                marginBottom: 20,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 4,
        },
        addPetIconContainer: {
                marginBottom: 16,
        },
        addPetIconBg: {
                width: 64,
                height: 64,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
        },
        addPetTitle: {
                fontSize: 20,
                fontWeight: '700',
                color: colors.textPrimary,
                marginBottom: 8,
        },
        addPetSubtitle: {
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: 20,
        },
        addPetButton: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFF',
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 25,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
        },
        addPetButtonText: {
                fontSize: 15,
                fontWeight: '600',
                color: colors.primary,
                marginRight: 8,
        },
        quickActions: {
                marginBottom: 24,
        },
        sectionTitle: {
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
                marginBottom: 16,
        },
        actionGrid: {
                flexDirection: 'row',
                justifyContent: 'space-between',
        },
        actionItem: {
                width: (width - 48) / 4,
                alignItems: 'center',
        },
        actionIconBg: {
                width: 56,
                height: 56,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
        },
        actionLabel: {
                fontSize: 12,
                color: colors.textSecondary,
                fontWeight: '500',
        },
        tipSection: {
                marginBottom: 16,
        },
        tipCard: {
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: colors.secondary + '30',
        },
        tipHeader: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
        },
        tipEmoji: {
                fontSize: 20,
                marginRight: 8,
        },
        tipTag: {
                fontSize: 12,
                color: colors.secondary,
                fontWeight: '600',
                backgroundColor: colors.secondary + '20',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 10,
        },
        tipTitle: {
                fontSize: 16,
                fontWeight: '600',
                color: colors.textPrimary,
                marginBottom: 8,
        },
        tipContent: {
                fontSize: 14,
                color: colors.textSecondary,
                lineHeight: 22,
                marginBottom: 12,
        },
        tipButton: {
                alignSelf: 'flex-start',
        },
        tipButtonText: {
                fontSize: 14,
                color: colors.secondary,
                fontWeight: '600',
        },
});
