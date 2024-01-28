// eslint-disable-next-line import/no-cycle
import { client } from '../helpers/fetchProduct';
import { Product } from '../types/Product';
import { ProductInfo } from '../types/ProductInfo';
/* eslint-disable max-len */
export const BASE_URL = 'https://mate-academy.github.io/product_catalog/public';

export const getProducts = () => {
  return client.get<Product[]>('/api/products.json');
};

export const getPhones = async () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'phones'));
};

export const getTablets = async () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'tablets'));
};

export const getAccessories = async () => {
  return getProducts()
    .then(products => products
      .filter(product => product.category === 'accessories'));
};

export const getHotPriceProducts = (pcoducts: Product[]) => {
  return [...pcoducts]
    .sort((pr1, pr2) => ((1 - (pr1.fullPrice / pr1.price)) * 100)
      - (1 - (pr2.fullPrice / pr2.price)) * 100).slice(0, 16);
};

export const getBrandNewProducts = (products: Product[]) => {
  return [...products]
    .sort((pr1, pr2) => pr2.price - pr1.price).slice(0, 16);
};

export const getProductsInfo = (id: string, category: string) => {
  return client
    .get<ProductInfo[]>(`/api/${category}.json`)
    .then(products => products.find(product => product.id === id));
};

export function getRandomProducts(products: Product[]) {
  const copy = [...products];
  const randomizerArr = [];

  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const randomObject = copy.splice(randomIndex, 1)[0];

    randomizerArr.push(randomObject);
  }

  return randomizerArr.slice(0, 16);
}
