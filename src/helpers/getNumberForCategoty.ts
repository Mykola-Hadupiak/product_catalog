import { Product } from '../types/Product';

export const getNumberForCategoty = (productsFromServer: Product[]) => {
  const numbers = {
    phones: 0,
    accessories: 0,
    tablets: 0,
  };

  productsFromServer.forEach(product => {
    if (product.category in numbers) {
      numbers[product.category as keyof typeof numbers] += 1;
    }
  });

  return Object.values(numbers);
};
