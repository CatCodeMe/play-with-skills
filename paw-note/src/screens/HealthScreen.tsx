import React from 'react';
import {
        View,
        Text,
        StyleSheet,
        ScrollView,
        TouchableOpacity,
        Dimensions,
        TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

// 健康科普分类数据
const categories = [
        { id: '1', icon: 'shield-checkmark', title: '疫苗接种', color: '#4CAF50', bgColors: ['#E8F5E9', '#C8E6C9'] },
        { id: '2', icon: 'bug', title: '驱虫指南', color: '#FF9800', bgColors: ['#FFF3E0', '#FFE0B2'] },
        { id: '3', icon: 'nutrition', title: '饮食营养', color: '#E91E63', bgColors: ['#FCE4EC', '#F8BBD9'] },
        { id: '4', icon: 'medkit', title: '常见疾病', color: '#F44336', bgColors: ['#FFEBEE', '#FFCDD2'] },
        { id: '5', icon: 'cut', title: '日常护理', color: '#9C27B0', bgColors: ['#F3E5F5', '#E1BEE7'] },
        { id: '6', icon: 'fitness', title: '运动健身', color: '#2196F3', bgColors: ['#E3F2FD', '#BBDEFB'] },
];

// 热门文章数据
const articles = [
        {
                id: '1',
                title: '新手养狗必看：第一年疫苗全攻略',
                category: '疫苗接种',
                readTime: '5分钟',
                views: '10.2k',
                image: '🐕',
        },
        {
                id: '2',
                title: '猫咪不能吃的10种常见食物',
                category: '饮食营养',
                readTime: '3分钟',
                views: '8.5k',
                image: '🐱',
        },
        {
                id: '3',
                title: '如何判断宠物是否需要看医生',
                category: '常见疾病',
                readTime: '4分钟',
                views: '6.8k',
                image: '🏥',
        },
];

export default function HealthScreen() {
        return (
                <View style={styles.container}>
                        {/* 渐变头部 */}
                        <LinearGradient
                                colors={[colors.secondary, colors.secondaryLight]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.headerGradient}
                        >
                                <SafeAreaView edges={['top']}>
                                        <View style={styles.headerContent}>
                                                <Text style={styles.headerTitle}>健康百科</Text>
                                                <Text style={styles.headerSubtitle}>科学养宠，守护毛孩健康</Text>

                                                {/* 搜索框 */}
                                                <View style={styles.searchContainer}>
                                                        <Ionicons name="search" size={20} color={colors.textSecondary} />
                                                        <TextInput
                                                                style={styles.searchInput}
                                                                placeholder="搜索健康问题..."
                                                                placeholderTextColor={colors.textLight}
                                                        />
                                                        <TouchableOpacity style={styles.voiceButton}>
                                                                <Ionicons name="mic-outline" size={20} color={colors.secondary} />
                                                        </TouchableOpacity>
                                                </View>
                                        </View>
                                </SafeAreaView>
                        </LinearGradient>

                        <ScrollView
                                style={styles.content}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContent}
                        >
                                {/* 分类网格 */}
                                <View style={styles.categoriesSection}>
                                        <View style={styles.sectionHeader}>
                                                <Text style={styles.sectionTitle}>健康分类</Text>
                                                <TouchableOpacity>
                                                        <Text style={styles.seeAllText}>查看全部</Text>
                                                </TouchableOpacity>
                                        </View>

                                        <View style={styles.categoryGrid}>
                                                {categories.map((cat) => (
                                                        <TouchableOpacity
                                                                key={cat.id}
                                                                style={styles.categoryCard}
                                                                activeOpacity={0.7}
                                                        >
                                                                <LinearGradient
                                                                        colors={cat.bgColors}
                                                                        style={styles.categoryIconBg}
                                                                >
                                                                        <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                                                                </LinearGradient>
                                                                <Text style={styles.categoryTitle}>{cat.title}</Text>
                                                        </TouchableOpacity>
                                                ))}
                                        </View>
                                </View>

                                {/* 热门文章 */}
                                <View style={styles.articlesSection}>
                                        <View style={styles.sectionHeader}>
                                                <Text style={styles.sectionTitle}>热门文章</Text>
                                                <TouchableOpacity>
                                                        <Text style={styles.seeAllText}>更多</Text>
                                                </TouchableOpacity>
                                        </View>

                                        {articles.map((article, index) => (
                                                <TouchableOpacity
                                                        key={article.id}
                                                        style={[
                                                                styles.articleCard,
                                                                index === articles.length - 1 && { marginBottom: 0 }
                                                        ]}
                                                        activeOpacity={0.7}
                                                >
                                                        <View style={styles.articleImageContainer}>
                                                                <Text style={styles.articleEmoji}>{article.image}</Text>
                                                        </View>
                                                        <View style={styles.articleContent}>
                                                                <View style={styles.articleCategory}>
                                                                        <Text style={styles.articleCategoryText}>{article.category}</Text>
                                                                </View>
                                                                <Text style={styles.articleTitle} numberOfLines={2}>
                                                                        {article.title}
                                                                </Text>
                                                                <View style={styles.articleMeta}>
                                                                        <View style={styles.articleMetaItem}>
                                                                                <Ionicons name="time-outline" size={14} color={colors.textLight} />
                                                                                <Text style={styles.articleMetaText}>{article.readTime}</Text>
                                                                        </View>
                                                                        <View style={styles.articleMetaItem}>
                                                                                <Ionicons name="eye-outline" size={14} color={colors.textLight} />
                                                                                <Text style={styles.articleMetaText}>{article.views}</Text>
                                                                        </View>
                                                                </View>
                                                        </View>
                                                        <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
                                                </TouchableOpacity>
                                        ))}
                                </View>

                                {/* AI 推荐入口 */}
                                <TouchableOpacity activeOpacity={0.9}>
                                        <LinearGradient
                                                colors={[colors.accent, '#FFCC66']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={styles.aiCard}
                                        >
                                                <View style={styles.aiContent}>
                                                        <Text style={styles.aiTitle}>🤖 AI 健康咨询</Text>
                                                        <Text style={styles.aiSubtitle}>
                                                                有问题？直接问 AI 助手
                                                        </Text>
                                                </View>
                                                <View style={styles.aiButton}>
                                                        <Ionicons name="arrow-forward" size={20} color={colors.accent} />
                                                </View>
                                        </LinearGradient>
                                </TouchableOpacity>

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
                paddingBottom: 24,
        },
        headerContent: {
                paddingHorizontal: 20,
                paddingTop: 12,
        },
        headerTitle: {
                fontSize: 28,
                fontWeight: '700',
                color: '#FFF',
                marginBottom: 4,
        },
        headerSubtitle: {
                fontSize: 14,
                color: 'rgba(255,255,255,0.9)',
                marginBottom: 16,
        },
        searchContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
        },
        searchInput: {
                flex: 1,
                fontSize: 15,
                color: colors.textPrimary,
                marginLeft: 10,
                paddingVertical: 0,
        },
        voiceButton: {
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.secondary + '15',
                alignItems: 'center',
                justifyContent: 'center',
        },
        content: {
                flex: 1,
                marginTop: -10,
        },
        scrollContent: {
                paddingHorizontal: 16,
                paddingTop: 20,
        },
        categoriesSection: {
                marginBottom: 24,
        },
        sectionHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
        },
        sectionTitle: {
                fontSize: 18,
                fontWeight: '600',
                color: colors.textPrimary,
        },
        seeAllText: {
                fontSize: 14,
                color: colors.secondary,
                fontWeight: '500',
        },
        categoryGrid: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
        },
        categoryCard: {
                width: (width - 44) / 3,
                alignItems: 'center',
                marginBottom: 16,
        },
        categoryIconBg: {
                width: 56,
                height: 56,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
        },
        categoryTitle: {
                fontSize: 13,
                color: colors.textSecondary,
                fontWeight: '500',
        },
        articlesSection: {
                marginBottom: 24,
        },
        articleCard: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.surface,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
        },
        articleImageContainer: {
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: colors.background,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
        },
        articleEmoji: {
                fontSize: 28,
        },
        articleContent: {
                flex: 1,
        },
        articleCategory: {
                alignSelf: 'flex-start',
                marginBottom: 6,
        },
        articleCategoryText: {
                fontSize: 11,
                color: colors.secondary,
                fontWeight: '600',
                backgroundColor: colors.secondary + '15',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                overflow: 'hidden',
        },
        articleTitle: {
                fontSize: 15,
                fontWeight: '600',
                color: colors.textPrimary,
                marginBottom: 6,
                lineHeight: 20,
        },
        articleMeta: {
                flexDirection: 'row',
        },
        articleMetaItem: {
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 12,
        },
        articleMetaText: {
                fontSize: 12,
                color: colors.textLight,
                marginLeft: 4,
        },
        aiCard: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
        },
        aiContent: {
                flex: 1,
        },
        aiTitle: {
                fontSize: 18,
                fontWeight: '700',
                color: '#FFF',
                marginBottom: 4,
        },
        aiSubtitle: {
                fontSize: 14,
                color: 'rgba(255,255,255,0.9)',
        },
        aiButton: {
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
        },
});
