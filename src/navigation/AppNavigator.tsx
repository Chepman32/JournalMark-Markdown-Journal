import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, EditorScreen, SettingsScreen} from '@/screens';
import {useTheme} from '@/hooks/useTheme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
        },
      }}>
      <Tab.Screen
        name="Journal"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Journal',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const {colors} = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen
          name="Editor"
          component={EditorScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
