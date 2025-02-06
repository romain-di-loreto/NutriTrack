import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function Profile() {
    const { signOut, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser(); // Use the useUser hook to get the full user data

    if (!isLoaded) {
        return <Text>Loading...</Text>;
    }

    if (!isSignedIn) {
        return <Text>Please sign in to view your profile.</Text>;
    }

    // Check if the user data is available
    if (!user) {
        return <Text>Error: User data not available.</Text>;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ marginVertical: 5 }}>
                Email: {user.emailAddresses[0]?.emailAddress}
            </Text>
            <Text style={{ marginVertical: 5 }}>
                Created the: {user.createdAt?.toLocaleDateString()}
            </Text>
            <Text style={{ marginVertical: 5 }}>
                At: {user.createdAt?.toLocaleTimeString()}
            </Text>

            <Button title="Sign out" onPress={() => signOut()} />
        </View>
    );
}
