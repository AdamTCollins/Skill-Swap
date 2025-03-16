import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    swaps: [
        { id: 1, user: 'Ethan', offering: 'Carpentry', wanting: 'Gardening', avatar: 'https://via.placeholder.com/60x60?text=E' },
        { id: 2, user: 'Zoe', offering: 'Singing', wanting: 'Piano', avatar: 'https://via.placeholder.com/60x60?text=O' },
        { id: 3, user: 'Noah', offering: 'Graphic Design', wanting: 'Photography', avatar: 'https://via.placeholder.com/60x60?text=N' },
        { id: 4, user: 'Ava', offering: 'Spanish', wanting: 'French', avatar: 'https://via.placeholder.com/60x60?text=A' },
        { id: 5, user: 'Benjamin', offering: 'Fitness Training', wanting: 'Nutrition', avatar: 'https://via.placeholder.com/60x60?text=B' },
        { id: 6, user: 'Sophia', offering: 'Mathematics', wanting: 'Physics', avatar: 'https://via.placeholder.com/60x60?text=S' },
        { id: 7, user: 'William', offering: 'Chess', wanting: 'Poker', avatar: 'https://via.placeholder.com/60x60?text=W' },
        { id: 8, user: 'Isabella', offering: 'Fiction Writing', wanting: 'Poetry', avatar: 'https://via.placeholder.com/60x60?text=I' },
        { id: 9, user: 'James', offering: 'Pottery', wanting: 'Sculpting', avatar: 'https://via.placeholder.com/60x60?text=J' },
        { id: 10, user: 'Charlotte', offering: 'Italian Cooking', wanting: 'Baking', avatar: 'https://via.placeholder.com/60x60?text=C' },
    ],
    loading: false,
    error: null,
};

const swapSlice = createSlice({
    name: 'swaps',
    initialState,
    reducers: {}
});

export default swapSlice.reducer;