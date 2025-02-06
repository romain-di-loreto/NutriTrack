import React from 'react';
import { tokenCache } from '../libs/cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MealProvider } from '../context/mealProvider';

export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

    if (!publishableKey) {
        throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
    }

    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ClerkLoaded>
                <MealProvider>
                    <StatusBar style='auto'/>
                    <Slot />
                </MealProvider>
            </ClerkLoaded>
        </ClerkProvider>
    )
}