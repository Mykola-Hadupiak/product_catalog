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

export const getHotPriceProducts = (products: Product[]): Product[] => {
  const categoryMap: { [category: string]: Product[] } = {};

  products.forEach(product => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = [];
    }

    categoryMap[product.category].push(product);
  });

  const selectedProducts: Product[] = [];

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const category in categoryMap) {
    const categoryProducts = categoryMap[category];
    const slicedProducts = categoryProducts.slice(0, 4);

    selectedProducts.push(...slicedProducts);
  }

  for (let i = selectedProducts.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [selectedProducts[i], selectedProducts[j]] = [selectedProducts[j], selectedProducts[i]];
  }

  return selectedProducts.slice(0, 16);
};

export const getBrandNewProducts = (products: Product[]): Product[] => {
  const filteredProducts = products.filter(product => product.itemId.includes('14'));
  const sortedProducts = filteredProducts.sort((pr1, pr2) => pr2.price - pr1.price);

  return sortedProducts.slice(0, 16);
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
