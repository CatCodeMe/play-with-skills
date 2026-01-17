import React, { useState, useRef } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: '你好！我是毛孩健康助手 🐾\n\n有什么可以帮到你的吗？',
  },
];

const quickQuestions = [
  { text: '狗狗老是挠耳朵' },
  { text: '猫咪不吃东西' },
  { text: '多久该驱虫' },
  { text: '疫苗时间表' },
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
      content: '让我帮你分析一下...\n\n（AI 功能开发中）',
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* 头部 */}
      <XStack
        paddingHorizontal={16}
        paddingVertical={10}
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="white"
        borderBottomWidth={1}
        borderBottomColor={colors.border}
      >
        <XStack alignItems="center" gap={10}>
          <View
            width={36}
            height={36}
            borderRadius={4}
            backgroundColor={colors.background}
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={18}>🤖</Text>
          </View>
          <YStack>
            <Text fontSize={15} fontWeight="600" color={colors.textPrimary}>
              AI 助手
            </Text>
            <XStack alignItems="center" gap={4}>
              <View width={5} height={5} borderRadius={2.5} backgroundColor="#4CAF50" />
              <Text fontSize={10} color={colors.textLight}>在线</Text>
            </XStack>
          </YStack>
        </XStack>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </XStack>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        >
          {messages.map((msg) => (
            <XStack
              key={msg.id}
              marginBottom={12}
              justifyContent={msg.type === 'user' ? 'flex-end' : 'flex-start'}
              alignItems="flex-start"
            >
              {msg.type === 'ai' && (
                <View
                  width={28}
                  height={28}
                  borderRadius={4}
                  backgroundColor="white"
                  alignItems="center"
                  justifyContent="center"
                  marginRight={8}
                >
                  <Text fontSize={14}>🤖</Text>
                </View>
              )}
              <View
                maxWidth="75%"
                borderRadius={6}
                padding={12}
                backgroundColor={msg.type === 'user' ? colors.primary : 'white'}
              >
                <Text
                  fontSize={13}
                  lineHeight={20}
                  color={msg.type === 'user' ? 'white' : colors.textPrimary}
                >
                  {msg.content}
                </Text>
              </View>
            </XStack>
          ))}

          {/* 快捷问题 */}
          {messages.length === 1 && (
            <YStack marginTop={8}>
              <Text fontSize={12} color={colors.textLight} marginBottom={10}>
                快捷提问
              </Text>
              <XStack flexWrap="wrap" gap={8}>
                {quickQuestions.map((q, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => setInputText(q.text)}
                  >
                    <View
                      backgroundColor="white"
                      borderRadius={4}
                      paddingHorizontal={12}
                      paddingVertical={8}
                    >
                      <Text fontSize={12} color={colors.textPrimary}>
                        {q.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </XStack>
            </YStack>
          )}
        </ScrollView>

        {/* 输入区域 */}
        <YStack
          backgroundColor="white"
          borderTopWidth={1}
          borderTopColor={colors.border}
          paddingTop={10}
          paddingBottom={Platform.OS === 'ios' ? 28 : 10}
          paddingHorizontal={16}
        >
          <XStack alignItems="flex-end" gap={8}>
            <View
              flex={1}
              backgroundColor={colors.background}
              borderRadius={6}
              paddingHorizontal={12}
              paddingVertical={8}
            >
              <TextInput
                style={{
                  fontSize: 14,
                  color: colors.textPrimary,
                  maxHeight: 80,
                  paddingVertical: 0,
                }}
                placeholder="输入问题..."
                placeholderTextColor={colors.textLight}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
            </View>
            <TouchableOpacity
              onPress={handleSend}
              disabled={!inputText.trim()}
              activeOpacity={0.7}
            >
              <View
                width={40}
                height={40}
                borderRadius={6}
                backgroundColor={inputText.trim() ? colors.primary : colors.border}
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="send" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </XStack>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
