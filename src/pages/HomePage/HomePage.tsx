import React, { useCallback, useEffect, useMemo } from 'react';
import './HomePage.scss';
import { Carousel } from '../../components/Carousel';
import { ProductSlider } from '../../components/ProductSlider';
import { Categories } from '../../components/Categories';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { thunkGetProducts } from '../../features/product/productsSlice';
import { getBrandNewProducts, getHotPriceProducts } from '../../api/api';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);

  const loadPhones = useCallback(() => {
    dispatch(thunkGetProducts());
  }, [dispatch]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const hotPrices = useMemo(() => {
    return getHotPriceProducts(products);
  }, [products]);

  const brandNew = useMemo(() => {
    return getBrandNewProducts(products);
  }, [products]);

  return (
    <div className="home-page">
      <Carousel />

      {loading && !error && (
        <div className="home-page__loader">
          <Loader />
        </div>
      )}

      {!loading && !error && products && (
        <section className="hot-prices">
          <ProductSlider title="Hot prices" products={hotPrices} />
        </section>
      )}

      <section className="shop-by-category">
        <Categories />
      </section>

      {loading && !error && (
        <div className="home-page__loader">
          <Loader />
        </div>
      )}

      {!loading && !error && products && (
        <section className="brand-new-models">
          <ProductSlider title="Brand new models" products={brandNew} />
        </section>
      )}
    </div>
  );
};
