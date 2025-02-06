import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMeals } from '../../context/mealProvider';
import Meal from '../../models/Meal';
import FoodCard from '../../components/foodCard';

const API_KEY = process.env.EXPO_PUBLIC_EDAMAM_API_KEY!;
const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID!;
const FOOD_PARSER_URL = 'https://api.edamam.com/api/food-database/v2/parser';

type RootStackParamList = {
    CameraScreen: undefined;
    MealList: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Add() {
    const navigation = useNavigation<NavigationProp>();
    const { addMeal } = useMeals(); 
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]); 
    const [loading, setLoading] = useState(false);

    const fetchResults = async (searchQuery: string) => {
        if (!searchQuery) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const url = `${FOOD_PARSER_URL}?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${searchQuery}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.hints && data.hints.length > 0) {
                const seenFoodIds = new Set();
                const uniqueResults = data.hints
                    .map((hint: any) => hint.food)  
                    .filter((food: any) => {
                        if (seenFoodIds.has(food.foodId)) {
                            return false; 
                        } else {
                            seenFoodIds.add(food.foodId);  
                            return true;
                        }
                    });

                setResults(uniqueResults.map((food: { foodId: any; label: any; category: any; nutrients: { ENERC_KCAL: any; }; image: any; }) => {
                    const meal: Meal = {
                        id: food.foodId, 
                        name: food.label, 
                        description: `Category: ${food.category} | Calories: ${food.nutrients.ENERC_KCAL} kcal`, 
                        image: food.image, 
                        calories: food.nutrients.ENERC_KCAL, 
                    };
                    return meal;
                }));
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Error fetching data from Edamam API', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMeal = (meal: Meal) => {
        addMeal(meal);
        setQuery(''); 
        navigation.goBack();
    };

    useEffect(() => {
        fetchResults(query);
    }, [query]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search for meals"
                />
                <TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}>
                    <Ionicons name="camera" size={24} color="black" style={styles.cameraButton} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.foodId}
                    renderItem={({ item }) => (
                        <FoodCard
                            meal={item}
                            onAddMeal={() => handleAddMeal(item)}
                        />
                    )}
                    style={styles.flatList}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    cameraButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
    },
    flatList: {
        marginTop: 8,
    },
});
