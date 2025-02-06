import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter, useNavigation } from 'expo-router';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';

export default function LoginScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const navigation = useNavigation();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Login' });
    }, [navigation]);

    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [isLoaded, emailAddress, password]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                onChangeText={setEmailAddress}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter password"
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title="Sign In" onPress={onSignInPress} color="#007AFF" />
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <Link href="/signup">
                    <Text style={styles.signupLink}> Sign up</Text>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    signupText: {
        color: '#666',
    },
    signupLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});
