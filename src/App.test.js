/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
const axios = require("axios");


jest.mock('axios');

const mockedProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 20,
    discountPercentage: 10,
    rating: 4,
    stock: 100,
    brand: 'Brand 1',
    category: 'Category 1',
    thumbnail: 'thumbnail1.jpg',
    images: ['image1.jpg', 'image2.jpg'],
  },
  // Add more mocked products as needed for testing different scenarios
];

describe('App Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { products: mockedProducts } });
  });

  it('fetches and displays products correctly', async () => {
    render(<App />);

    // Ensure that the component renders with loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the products to be fetched and displayed
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products');
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('$ 20')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });
  });

  it('displays error message on failed API fetch', async () => {
    const errorMessage = 'Failed to fetch products';
    axios.get.mockRejectedValue(new Error(errorMessage));

    render(<App />);

    // Ensure that the component renders with loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://dummyjson.com/products');
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  // Add more test cases as needed to cover other component functionalities
});
