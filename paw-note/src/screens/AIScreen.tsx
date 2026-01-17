import React, { useState, useRef } from 'react';
import {
        View,
        Text,
        StyleSheet,
        ScrollView,
        TextInput,
        TouchableOpacity,
        KeyboardAvoidingView,
        Platform,
        Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Message {
        id: string;
        type: 'ai' | 'user';
        content: string;
}

// 示例对话数据
const initialMessages: Message[] = [
        {
                id: '1',
                type: 'ai',
                content: '你好！我是毛孩健康助手 🐾\n\n我可以帮你解答宠物健康问题、提供护理建议，还会主动提醒你驱虫和疫苗时间。\n\n有什么可以帮到你的吗？',
        },
];

// 快捷问题
const quickQuestions = [
        { emoji: '🐕', text: '狗狗老是挠耳朵怎么办' },
        { emoji: '🐱', text: '猫咪不吃东西的原因' },
        { emoji: '💊', text: '多久该驱虫一次' },
        { emoji: '💉', text: '疫苗接种时间表' },
];

export default function AIScreen() {
        const [messages, setMessages] = useState<Message[]>(initialMessages);
        const [inputText, setInputText] = useState('');
        const scrollViewRef = useRef<ScrollView>(null);

        const handleSend = () => {
                if (!inputText.trim()) return;

                const userMessage: Message = {
                        id: Date.now().toString(),
                        type: 'user',
                        content: inputText,
                };

                const aiResponse: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'ai',
                        content: '让我帮你分析一下这个问题... 🤔\n\n（AI 功能正在开发中，很快就能和你真正对话啦！敬请期待~）',
                };

                setMessages([...messages, userMessage, aiResponse]);
                setInputText('');

                setTimeout(() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
        };

        const handleQuickQuestion = (question: string) => {
                setInputText(question);
        };

        return (
                <View style={styles.container}>
                        {/* 渐变头部 */}
                        <LinearGradient
                                colors={[colors.accent, '#FFCC66']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.headerGradient}
                        >
                                <SafeAreaView edges={['top']}>
                                        <View style={styles.headerContent}>
                                                <View style={styles.headerLeft}>
                                                        <Text style={styles.headerTitle}>AI 助手</Text>
                                                        <View style={styles.statusBadge}>
                                                                <View style={styles.statusDot} />
                                                                <Text style={styles.statusText}>在线</Text>
                                                        </View>
                                                </View>
                                                <TouchableOpacity style={styles.historyButton}>
                                                        <Ionicons name="time-outline" size={22} color="#FFF" />
                                                </TouchableOpacity>
                                        </View>
                                </SafeAreaView>
                        </LinearGradient>

                        <KeyboardAvoidingView
                                style={styles.chatContainer}
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                keyboardVerticalOffset={0}
                        >
                                <ScrollView
                                        ref={scrollViewRef}
                                        style={styles.messagesContainer}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={styles.messagesContent}
                                >
                                        {messages.map((msg) => (
                                                <View
                                                        key={msg.id}
                                                        style={[
                                                                styles.messageBubble,
                                                                msg.type === 'user' ? styles.userBubble : styles.aiBubble,
                                                        ]}
                                                >
                                                        {msg.type === 'ai' && (
                                                                <LinearGradient
                                                                        colors={[colors.accent, '#FFCC66']}
                                                                        style={styles.aiAvatar}
                                                                >
                                                                        <Text style={styles.aiAvatarText}>🤖</Text>
                                                                </LinearGradient>
                                                        )}
                                                        <View
                                                                style={[
                                                                        styles.messageContent,
                                                                        msg.type === 'user' ? styles.userContent : styles.aiContent,
                                                                ]}
                                                        >
                                                                <Text
                                                                        style={[
                                                                                styles.messageText,
                                                                                msg.type === 'user' ? styles.userText : styles.aiText,
                                                                        ]}
                                                                >
                                                                        {msg.content}
                                                                </Text>
                                                        </View>
                                                </View>
                                        ))}

                                        {/* 快捷问题 */}
                                        {messages.length === 1 && (
                                                <View style={styles.quickQuestions}>
                                                        <Text style={styles.quickTitle}>快捷提问</Text>
                                                        <View style={styles.quickGrid}>
                                                                {quickQuestions.map((q, index) => (
                                                                        <TouchableOpacity
                                                                                key={index}
                                                                                style={styles.quickButton}
                                                                                onPress={() => handleQuickQuestion(q.text)}
                                                                                activeOpacity={0.7}
                                                                        >
                                                                                <Text style={styles.quickEmoji}>{q.emoji}</Text>
                                                                                <Text style={styles.quickButtonText} numberOfLines={2}>
                                                                                        {q.text}
                                                                                </Text>
                                                                        </TouchableOpacity>
                                                                ))}
                                                        </View>
                                                </View>
                                        )}
                                </ScrollView>

                                {/* 输入区域 */}
                                <View style={styles.inputWrapper}>
                                        <View style={styles.inputContainer}>
                                                <TextInput
                                                        style={styles.input}
                                                        placeholder="输入你的问题..."
                                                        placeholderTextColor={colors.textLight}
                                                        value={inputText}
                                                        onChangeText={setInputText}
                                                        multiline
                                                        maxLength={500}
                                                />
                                                <TouchableOpacity
                                                        style={[
                                                                styles.sendButton,
                                                                !inputText.trim() && styles.sendButtonDisabled
                                                        ]}
                                                        onPress={handleSend}
                                                        disabled={!inputText.trim()}
                                                        activeOpacity={0.7}
                                                >
                                                        <LinearGradient
                                                                colors={inputText.trim()
                                                                        ? [colors.accent, '#FFCC66']
                                                                        : [colors.textLight, colors.textLight]
                                                                }
                                                                style={styles.sendButtonGradient}
                                                        >
                                                                <Ionicons
                                                                        name="send"
                                                                        size={18}
                                                                        color="#FFF"
                                                                />
                                                        </LinearGradient>
                                                </TouchableOpacity>
                                        </View>

                                        {/* 功能按钮 */}
                                        <View style={styles.actionButtons}>
                                                <TouchableOpacity style={styles.actionButton}>
                                                        <Ionicons name="camera-outline" size={20} color={colors.textSecondary} />
                                                        <Text style={styles.actionButtonText}>拍照识别</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.actionButton}>
                                                        <Ionicons name="image-outline" size={20} color={colors.textSecondary} />
                                                        <Text style={styles.actionButtonText}>上传图片</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.actionButton}>
                                                        <Ionicons name="mic-outline" size={20} color={colors.textSecondary} />
                                                        <Text style={styles.actionButtonText}>语音输入</Text>
                                                </TouchableOpacity>
                                        </View>
                                </View>
                        </KeyboardAvoidingView>
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: colors.background,
        },
        headerGradient: {
                paddingBottom: 16,
        },
        headerContent: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: 12,
        },
        headerLeft: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        headerTitle: {
                fontSize: 28,
                fontWeight: '700',
                color: '#FFF',
                marginRight: 12,
        },
        statusBadge: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.25)',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 12,
        },
        statusDot: {
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#4CAF50',
                marginRight: 6,
        },
        statusText: {
                fontSize: 12,
                color: '#FFF',
                fontWeight: '500',
        },
        historyButton: {
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
        },
        chatContainer: {
                flex: 1,
        },
        messagesContainer: {
                flex: 1,
        },
        messagesContent: {
                padding: 16,
        },
        messageBubble: {
                flexDirection: 'row',
                marginBottom: 16,
                alignItems: 'flex-start',
        },
        userBubble: {
                justifyContent: 'flex-end',
        },
        aiBubble: {
                justifyContent: 'flex-start',
        },
        aiAvatar: {
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
        },
        aiAvatarText: {
                fontSize: 18,
        },
        messageContent: {
                maxWidth: '75%',
                borderRadius: 20,
                padding: 14,
        },
        userContent: {
                backgroundColor: colors.primary,
                borderBottomRightRadius: 6,
        },
        aiContent: {
                backgroundColor: colors.surface,
                borderBottomLeftRadius: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
        },
        messageText: {
                fontSize: 15,
                lineHeight: 22,
        },
        userText: {
                color: '#FFFFFF',
        },
        aiText: {
                color: colors.textPrimary,
        },
        quickQuestions: {
                marginTop: 8,
        },
        quickTitle: {
                fontSize: 14,
                color: colors.textSecondary,
                marginBottom: 12,
                fontWeight: '500',
        },
        quickGrid: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
        },
        quickButton: {
                width: '48%',
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
        quickEmoji: {
                fontSize: 24,
                marginBottom: 8,
        },
        quickButtonText: {
                fontSize: 13,
                color: colors.textPrimary,
                lineHeight: 18,
        },
        inputWrapper: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.divider,
                paddingTop: 12,
                paddingBottom: Platform.OS === 'ios' ? 30 : 12,
                paddingHorizontal: 16,
        },
        inputContainer: {
                flexDirection: 'row',
                alignItems: 'flex-end',
        },
        input: {
                flex: 1,
                backgroundColor: colors.background,
                borderRadius: 24,
                paddingHorizontal: 18,
                paddingVertical: 12,
                fontSize: 15,
                color: colors.textPrimary,
                maxHeight: 100,
                marginRight: 10,
        },
        sendButton: {
                marginBottom: 2,
        },
        sendButtonDisabled: {
                opacity: 0.5,
        },
        sendButtonGradient: {
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: 'center',
                justifyContent: 'center',
        },
        actionButtons: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 12,
                gap: 24,
        },
        actionButton: {
                alignItems: 'center',
        },
        actionButtonText: {
                fontSize: 11,
                color: colors.textSecondary,
                marginTop: 4,
        },
});
