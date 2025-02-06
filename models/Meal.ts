export default interface Meal {
    id: string;
    name: string;
    description: string;
    image: string; // Optional, if you want to store an image
    calories: number; // Optional, for storing the nutritional value
}
