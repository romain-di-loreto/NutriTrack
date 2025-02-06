import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Meal from '../models/Meal';
import { useMeals } from '../context/mealProvider';// Import the MealProvider hook

interface MealCardProps {
  meal: Meal;
  onPress: () => void;
}

const ProductCard: React.FC<MealCardProps> = ({ meal, onPress }) => {
  const { removeMeal } = useMeals(); // Access removeMeal function from MealProvider

  const handleRemoveMeal = () => {
    removeMeal(meal.id); // Call removeMeal to delete the meal
  };

  return (
    <View style={styles.card}>
      {/* Display meal image, if exists */}
      {meal.image && (
        <Image source={{ uri: meal.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{meal.name}</Text>
      
      <Text style={styles.calories}>Calories: {meal.calories} kcal</Text>

      {/* Remove button */}
      <TouchableOpacity onPress={handleRemoveMeal} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>

      {/* Optionally, handle meal press */}
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.moreInfoText}>More Info</Text>
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
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  calories: {
    fontSize: 14,
    color: '#444',
    marginBottom: 15,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  removeButtonText: {
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

export default ProductCard;
