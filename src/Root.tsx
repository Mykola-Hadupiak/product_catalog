import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
// import { PageCommingSoon } from './pages/PageCommingSoon';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones">
            <Route index element={<ProductsPage />} />
            <Route path=":itemId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/tablets">
            <Route index element={<ProductsPage />} />
            <Route path=":itemId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/accessories">
            <Route index element={<ProductsPage />} />
            <Route path=":itemId" element={<ProductDetailsPage />} />
          </Route>

          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
