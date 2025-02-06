import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@clerk/clerk-expo'; // To get the userId
import Meal from '../models/Meal'; // Assuming you already have a Meal model

interface MealContextType {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
  fetchMeals: () => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

interface MealProviderProps {
  children: ReactNode;
}

export const MealProvider = ({ children }: MealProviderProps) => {
  const { userId } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);

  // Helper function to fetch meals from local storage
  const fetchMealsFromStorage = async (userId: string) => {
    try {
      const storedMeals = await SecureStore.getItemAsync(`meals_${userId}`);
      if (storedMeals) {
        return JSON.parse(storedMeals);
      }
      return [];
    } catch (error) {
      console.error('Error fetching meals from storage:', error);
      return [];
    }
  };

  // Fetch meals on mount if userId is available
  useEffect(() => {
    if (userId) {
      fetchMeals();
    }
  }, [userId]);

  // Function to get meals
  const fetchMeals = async () => {
    if (userId) {
      const meals = await fetchMealsFromStorage(userId);
      setMeals(meals);
    }
  };

  const saveMealsToStorage = async (userId: string, meals: Meal[]) => {
    try {
      await SecureStore.setItemAsync(`meals_${userId}`, JSON.stringify(meals));
    } catch (error) {
      console.error('Error saving meals to storage:', error);
    }
  };

  // Function to add a meal
  const addMeal = async (meal: Meal) => {
    if (userId) {
      // Check if the meal with the same id already exists
      const mealExists = meals.some((existingMeal) => existingMeal.id === meal.id);

      if (!mealExists) {
        const updatedMeals = [...meals, meal];
        setMeals(updatedMeals);
        await saveMealsToStorage(userId, updatedMeals); // Save meals to storage
      } else {
        console.log('Meal already exists!');
      }
    }
  };

  // Function to remove a meal
  const removeMeal = async (id: string) => {
    if (userId) {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      setMeals(updatedMeals);
      await saveMealsToStorage(userId, updatedMeals); // Save meals to storage
    }
  };

  return (
    <MealContext.Provider value={{ meals, addMeal, removeMeal, fetchMeals }}>
      {children}
    </MealContext.Provider>
  );
};

// Custom hook to use MealContext
export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
};
