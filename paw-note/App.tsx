import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TamaguiProvider, View, Text } from 'tamagui';
import { TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { HealthScreen } from './src/screens';
import { colors, shadows, radius } from './src/theme/colors';
import tamaguiConfig from './tamagui.config';

const Tab = createBottomTabNavigator();

// 自定义 Tab Bar 按钮
const TabBarButton = ({ children, onPress, accessibilityState }: any) => {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

// 自定义 Tab Bar 图标组件
const TabIcon = ({
  focused,
  iconName,
  label
}: {
  focused: boolean;
  iconName: string;
  label: string;
}) => {
  const iconColor = focused ? colors.primary : colors.textTertiary;

  return (
    <View alignItems="center" gap={3}>
      {focused ? (
        <View
          width={42}
          height={32}
          borderRadius={radius.md}
          backgroundColor={colors.primaryMuted}
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons
            name={iconName as any}
            size={20}
            color={iconColor}
          />
        </View>
      ) : (
        <Ionicons
          name={`${iconName}-outline` as any}
          size={22}
          color={iconColor}
        />
      )}
      <Text
        fontSize={10}
        fontWeight={focused ? '600' : '400'}
        color={iconColor}
      >
        {label}
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopColor: colors.borderLight,
                borderTopWidth: 1,
                paddingTop: 6,
                paddingBottom: Platform.OS === 'ios' ? 24 : 10,
                height: Platform.OS === 'ios' ? 80 : 65,
                ...shadows.sm,
              },
              tabBarShowLabel: false,
            }}
          >
            <Tab.Screen
              name="首页"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} iconName="home" label="首页" />
                ),
                tabBarButton: (props) => <TabBarButton {...props} />,
              }}
            />
            <Tab.Screen
              name="发现"
              component={HealthScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} iconName="compass" label="发现" />
                ),
                tabBarButton: (props) => <TabBarButton {...props} />,
              }}
            />
            <Tab.Screen
              name="我的"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <TabIcon focused={focused} iconName="person" label="我的" />
                ),
                tabBarButton: (props) => <TabBarButton {...props} />,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
