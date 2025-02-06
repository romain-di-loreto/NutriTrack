import React, { useEffect, useState, useRef } from "react";
import { View, Text, Alert, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { useMeals } from "../../context/mealProvider";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const API_KEY = process.env.EXPO_PUBLIC_EDAMAM_API_KEY!;
const APP_ID = process.env.EXPO_PUBLIC_EDAMAM_APP_ID!;
const FOOD_PARSER_URL = "https://api.edamam.com/api/food-database/v2/parser";

type RootStackParamList = {
    MainTabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [barcode, setBarcode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const { addMeal } = useMeals();

    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission();
        }
    }, [permission]);


    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        setScanned(true);
        setBarcode(data);
        await fetchFoodData(data);
    };

    const fetchFoodData = async (barcode: string) => {
        setLoading(true);
        try {
            const url = `${FOOD_PARSER_URL}?app_id=${APP_ID}&app_key=${API_KEY}&upc=${barcode}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.foods && data.foods.length > 0) {
                const food = data.foods[0].food;
                showFoodValidation(food);
            } else {
                Alert.alert("Food not found", "We couldn't find the food product. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching data from Edamam API", error);
            Alert.alert("Error", "Something went wrong while fetching the food information.");
        } finally {
            setLoading(false);
        }
    };

    const showFoodValidation = (food: any) => {
        Alert.alert(
            "Food Found",
            `Is this the correct food?\n\nName: ${food.label}\nCategory: ${food.category}`,
            [
                { text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" },
                {
                    text: "Yes",
                    onPress: () => {
                        addMeal({
                            id: food.foodId,
                            name: food.label,
                            description: `Category: ${food.category}`,
                            image: food.image,
                            calories: food.nutrients.ENERC_KCAL,
                        });
                        navigation.popTo('MainTabs');
                    }
                }
            ]
        );
    };

    if (!permission?.granted) {
        return <Text>Requesting camera permission...</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing='back'
                autofocus="on"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['upc_a', 'upc_e']
                }}
            >

                <View style={styles.overlay}>
                    {loading && <Text style={styles.loadingText}>Loading...</Text>}
                </View>
            </CameraView>

            {scanned && !loading && (
                <View style={styles.scanResult}>
                    <Text style={styles.scanText}>Scanned Barcode: {barcode}</Text>
                    <Button title="Scan Again" onPress={() => setScanned(false)} />
                </View>
            )}

            <Ionicons
                name="close"
                size={30}
                color="white"
                style={styles.closeButton}
                onPress={() => navigation.popTo('MainTabs')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingText: {
        fontSize: 20,
        color: "white",
    },
    scanResult: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    scanText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 2,
    },
});
