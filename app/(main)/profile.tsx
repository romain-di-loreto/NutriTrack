import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function Profile() {
    const { signOut, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();

    if (!isLoaded) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (!isSignedIn) {
        return <Text style={styles.messageText}>Please sign in to view your profile.</Text>;
    }

    if (!user) {
        return <Text style={styles.errorText}>Error: User data not available.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Email: {user.emailAddresses[0]?.emailAddress}</Text>
                <Text style={styles.infoText}>Created on: {user.createdAt?.toLocaleDateString()}</Text>
                <Text style={styles.infoText}>At: {user.createdAt?.toLocaleTimeString()}</Text>
            </View>
            <Button title="Sign out" onPress={() => signOut()} color="#007AFF" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#666',
    },
    messageText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#007AFF',
    },
    errorText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'red',
    },
});
