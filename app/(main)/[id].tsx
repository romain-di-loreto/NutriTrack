import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native'; // To access the route params
import { useMeals } from '../../context/mealProvider'; // To access the MealProvider context
import Meal from '../../models/Meal';

// Define the type of the route params
type RootStackParamList = {
    MealDetails: { id: string };
    add: undefined;
};

type MealDetailsRouteProp = RouteProp<RootStackParamList, 'MealDetails'>;

export default function MealDetails() {
    const route = useRoute<MealDetailsRouteProp>(); // Get the route params
    const { id } = route.params; // Extract meal id
    const { meals, removeMeal } = useMeals(); // Access meals from MealProvider
    const [meal, setMeal] = useState<Meal | null>(null);

    useEffect(() => {
        // Find the meal in the list of meals from the MealProvider using the id
        const foundMeal = meals.find(meal => meal.id === id);
        setMeal(foundMeal || null);
    }, [id, meals]);

    const handleRemoveMeal = () => {
        if (meal) {
            removeMeal(meal.id); // Call the removeMeal function from MealProvider
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
            {/* Meal image */}
            {meal.image && <Image source={{ uri: meal.image }} style={styles.image} />}

            <Text style={styles.title}>{meal.name}</Text>
            <Text style={styles.description}>{meal.description}</Text>
            <Text style={styles.calories}>Calories: {meal.calories}</Text>

            {/* Remove meal button */}
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
