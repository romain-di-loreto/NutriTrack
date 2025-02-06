import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native'; 
import { useMeals } from '../../context/mealProvider';
import Meal from '../../models/Meal';

type RootStackParamList = {
    MealDetails: { id: string };
    add: undefined;
};

type MealDetailsRouteProp = RouteProp<RootStackParamList, 'MealDetails'>;

export default function MealDetails() {
    const route = useRoute<MealDetailsRouteProp>(); 
    const { id } = route.params; 
    const { meals, removeMeal } = useMeals(); 
    const [meal, setMeal] = useState<Meal | null>(null);

    useEffect(() => {
        const foundMeal = meals.find(meal => meal.id === id);
        setMeal(foundMeal || null);
    }, [id, meals]);

    const handleRemoveMeal = () => {
        if (meal) {
            removeMeal(meal.id); 
        }
    };

    if (!meal) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {meal.image && <Image source={{ uri: meal.image }} style={styles.image} />}

            <Text style={styles.title}>{meal.name}</Text>
            <Text style={styles.description}>{meal.description}</Text>
            <Text style={styles.calories}>Calories: {meal.calories}</Text>

            <TouchableOpacity onPress={handleRemoveMeal} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    calories: {
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
