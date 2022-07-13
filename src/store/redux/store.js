// 1 create store and provider in src/store/redux/store.js
import { configureStore , applyMiddleware} from '@reduxjs/toolkit'

// 8 import favoriteSlice from './favorite'
import favoriteReducer from './favorite'

// Devtool
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

// 2 create store and provider in src/store/redux/store.js
export const store = configureStore({
  reducer: {
    // 9 add favoriteReducer to store
    favoriteMeals : favoriteReducer
  },
  // composeEnhancers(),
})
