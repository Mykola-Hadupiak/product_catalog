/* eslint-disable global-require */
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './ProductsPage.scss';
import { thunkGetProducts } from '../../features/product/productsSlice';
import { Loader } from '../../components/Loader';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { SomethingWentWrong } from '../../components/SomethingWentWrong';

const nameOfThePage = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductsPage = () => {
  const { pathname } = useLocation();
  const { products, loading, error } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const loadPhones = useCallback(() => {
    dispatch(thunkGetProducts());
  }, [dispatch]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const normalizedPath = pathname.slice(1);

  const productsToRender = useMemo(() => {
    return products.filter(product => product.category === normalizedPath);
  }, [normalizedPath, products]);

  const correctName = useMemo(() => {
    return nameOfThePage[normalizedPath as keyof typeof nameOfThePage];
  }, [normalizedPath]);

  if (loading && !error) {
    return (
      <div
        className="products-page products-page--loading"
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <SomethingWentWrong />
    );
  }

  return (
    <ProductsCatalog products={productsToRender} name={correctName} />
  );
};
