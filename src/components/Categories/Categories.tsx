import { useMemo } from 'react';
import './Categories.scss';
import { useAppSelector } from '../../app/hooks';
import { Category } from '../Category';
import { categoryImages } from '../../helpers/constants';
import { getNumberForCategoty } from '../../helpers/getNumberForCategoty';

export const Categories = () => {
  const { products } = useAppSelector(state => state.products);

  const modelsAmount = useMemo(() => {
    return getNumberForCategoty(products);
  }, [products]);

  return (
    <div className="categories">
      <h1 className="categories__title title">
        Shop by category
      </h1>

      <div className="categories__categories">
        {categoryImages.map((image, i) => (
          <Category
            key={image}
            i={i}
            image={image}
            amount={modelsAmount[i]}
          />
        ))}
      </div>
    </div>
  );
};
