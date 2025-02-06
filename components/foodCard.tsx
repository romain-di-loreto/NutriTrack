import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Meal from '../models/Meal';

interface FoodCardProps {
    meal: Meal;
    onAddMeal: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ meal, onAddMeal }) => {
    return (
        <View style={styles.card}>
            {meal.image && (
                <Image source={{ uri: meal.image }} style={styles.image} />
            )}
            <Text style={styles.title}>{meal.name}</Text>
            <Text style={styles.calories}>Calories: {meal.calories} kcal</Text>

            <TouchableOpacity onPress={onAddMeal} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    calories: {
        fontSize: 14,
        color: '#444',
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    moreInfoText: {
        fontSize: 14,
        color: '#007bff',
        textAlign: 'center',
    },
});

export default FoodCard;
