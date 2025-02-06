// app/(main)/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native'; // To access the route params
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
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    // Mock API call or fetch meal details using the id
    const fetchedMeal: Meal = {
      id,
      name: `Meal ${id}`,
      description: `Detailed description of Meal ${id}`,
    };
    setMeal(fetchedMeal);
  }, [id]);

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meal.name}</Text>
      <Text style={styles.description}>{meal.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});
