import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/productCard';
import { useMeals } from '../../context/mealProvider'; // Import useMeals

type RootStackParamList = {
  MealDetails: { id: string };
  add: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MealList() {
  const navigation = useNavigation<NavigationProp>();
  const { meals, fetchMeals } = useMeals(); // Access meals and fetchMeals from context

  useEffect(() => {
    fetchMeals(); // Fetch meals when the component mounts
  }, [fetchMeals]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('add')}>
          <Ionicons name="add" size={24} color="#ffffff" style={styles.addButton} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          meal={item}
          onPress={() => navigation.navigate('MealDetails', { id: item.id })}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  addButton: {
    marginRight: 15,
  },
});
