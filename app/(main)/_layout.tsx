import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Index from './index';
import Add from './add';
import Profile from './profile';
import MealDetails from './[id]';
import CameraScreen from './camera';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    console.log("app/(main)/_layout.tsx");

    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="index"
                component={Index}
                options={{
                    tabBarLabel: 'Meals',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="food-bank" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="add"
                component={Add}
                options={{
                    tabBarLabel: 'Add',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function MainLayout() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MealDetails"
                component={MealDetails}
                options={{ title: 'Meal Details' }}
            />
            <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
