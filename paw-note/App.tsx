import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { PetScreen, HealthScreen, AIScreen } from './src/screens';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();

type IconName = 'paw' | 'paw-outline' | 'book' | 'book-outline' | 'chatbubble-ellipses' | 'chatbubble-ellipses-outline';

function TabBarIcon({ route, focused, color, size }: { route: string; focused: boolean; color: string; size: number }) {
  let iconName: IconName = 'paw';

  if (route === '我的毛孩') {
    iconName = focused ? 'paw' : 'paw-outline';
  } else if (route === '健康百科') {
    iconName = focused ? 'book' : 'book-outline';
  } else if (route === 'AI助手') {
    iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.tabActive,
            tabBarInactiveTintColor: colors.tabInactive,
          }}
        >
          <Tab.Screen
            name="我的毛孩"
            component={PetScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <TabBarIcon route="我的毛孩" focused={focused} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="健康百科"
            component={HealthScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <TabBarIcon route="健康百科" focused={focused} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="AI助手"
            component={AIScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <TabBarIcon route="AI助手" focused={focused} color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
