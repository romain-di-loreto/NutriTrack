import * as React from 'react';
import { Text, TextInput, Button, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter, Stack } from 'expo-router';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
            await signUp.create({ emailAddress, password });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign Up' }} />
            {pendingVerification ? (
                <>
                    <Text style={styles.title}>Verify Your Email</Text>
                    <TextInput
                        style={styles.input}
                        value={code}
                        placeholder="Enter verification code"
                        onChangeText={setCode}
                        keyboardType="numeric"
                    />
                    <Button title="Verify" onPress={onVerifyPress} color="#007AFF" />
                </>
            ) : (
                <>
                    <Text style={styles.title}>Create an Account</Text>
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
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                    <Button title="Continue" onPress={onSignUpPress} color="#007AFF" />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
});
