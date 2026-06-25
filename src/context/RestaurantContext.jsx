import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { restaurantAPI } from '../api/client';

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await restaurantAPI.get();
      setRestaurant(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load restaurant');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRestaurant = async (payload) => {
    const { data } = await restaurantAPI.update(payload);
    setRestaurant(data.data);
    return data;
  };

  const resetRestaurant = async () => {
    const { data } = await restaurantAPI.reset();
    setRestaurant(data.data);
    return data;
  };

  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  return (
    <RestaurantContext.Provider
      value={{ restaurant, loading, error, fetchRestaurant, updateRestaurant, resetRestaurant }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurant = () => useContext(RestaurantContext);
