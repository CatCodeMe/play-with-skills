import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TamaguiProvider } from 'tamagui';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { HealthScreen } from './src/screens';
import { colors } from './src/theme/colors';
import tamaguiConfig from './tamagui.config';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textLight,
              tabBarStyle: {
                backgroundColor: 'white',
                borderTopColor: colors.border,
                borderTopWidth: 1,
                paddingTop: 8,
                paddingBottom: 8,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '500',
              },
            }}
          >
            <Tab.Screen
              name="首页"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="发现"
              component={HealthScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <Ionicons name={focused ? 'compass' : 'compass-outline'} size={22} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="我的"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
