// 5 import createSlice from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'

// 6 setup createSlice 
const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        ids : [],
    },
    reducers : {
        addFavorite : (state, action) => {
            state.ids.push(action.payload.id);
        },
        removeFavorite : (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        } 
    },
});


//  7 export addFavorite and removeFavorite, 
export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;
export default favoriteSlice.reducer;