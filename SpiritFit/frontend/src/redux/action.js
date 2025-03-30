import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('/api/products'); // Replace with your API endpoint
    const data = await response.json();
    dispatch({ type: 'SET_PRODUCTS', payload: data });
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};
