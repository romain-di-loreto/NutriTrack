import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CameraScreen() {
    return (
        <View style={styles.container}>
            <Text>Camera screen (functionality to be added later)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
