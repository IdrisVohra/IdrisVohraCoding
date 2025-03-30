import { combineReducers } from 'redux';
// Import your individual reducers here
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer, // Add your reducers here
});

export default rootReducer;