import { useSelector } from '@/app/hooks';
import { canSelectSellerSelector } from '@/slices/user/selectors';
import { Seller } from '@/types/seller';
import { debounce } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { getSellerOptions, getSellers } from './services';
import { UseSellers } from './types';

/**
 * Check if user can select seller
 * @returns boolean
 */
export const useCanSelectSeller = () => {
  const canSelectSeller = useSelector(canSelectSellerSelector);
  return Boolean(canSelectSeller);
};

/**
 * Fetch seller list for select components, accepts an initial `sellerId`
 */
export const useSellers: UseSellers = (sellerId: string | number) => {
  const [sellers, setSellers] = useState<Array<Seller>>([]);
  const [fetching, setFetching] = useState(false);
  const intialSellerId = useRef(sellerId);

  const onSearch = debounce(async (value: string) => {
    try {
      setFetching(true);
      const response = await getSellers({ name: value });
      setSellers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }, 500);

  // Fetch seller list
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setFetching(true);
        const response = await getSellerOptions({ sellerId: intialSellerId.current });
        setSellers(response);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchSellers();
  }, []);

  return { sellers, fetching, onSearch };
};
