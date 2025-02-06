import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMeals } from '../../context/mealProvider';
import Meal from '../../models/Meal';

const API_KEY = process.env.EXPO_PUBLIC_EDAMAM_API_KEY!;
const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID!;
const AUTOCOMPLETE_URL = 'https://api.edamam.com/auto-complete';
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
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchResults = async (searchQuery: string) => {
        if (!searchQuery) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const url = `${AUTOCOMPLETE_URL}?q=${searchQuery}&app_id=${APP_ID}&app_key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching data from Edamam API', error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemPress = async (item: string) => {
        try {
            const url = `${FOOD_PARSER_URL}?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${item}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.hints && data.hints.length > 0) {
                const food = data.hints[0].food; 
                const meal: Meal = {
                    id: food.foodId, 
                    name: food.label, 
                    description: `Category: ${food.category} | Calories: ${food.nutrients.ENERC_KCAL} kcal`, 
                    image: food.image, 
                    calories: food.nutrients.ENERC_KCAL, 
                };
                addMeal(meal); 
                setQuery(''); // Clear the search bar
                navigation.goBack(); // Go back to the previous screen (index)
            } else {
                Alert.alert('Error', 'No information found for the selected item.');
            }
        } catch (error) {
            console.error('Error fetching food details from Edamam API', error);
            Alert.alert('Error', 'Error fetching food details from Edamam API.');
        }
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
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item)}>
                            <View style={styles.resultItem}>
                                <Text>{item}</Text>
                            </View>
                        </TouchableOpacity>
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
        marginBottom: 8, // Reduced margin to make the list closer
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
        marginTop: 8, // Reduced margin to make the list closer
    },
    resultItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
