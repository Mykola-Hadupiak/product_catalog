import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Breadcrumb } from '../Breadcrumb';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import * as pagination from '../../helpers/pagination';
import './ProductsCatalog.scss';
import { sortProducts } from '../../helpers/sortProducts';
import { Selector } from '../Selector';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { NoProductsFound } from '../NoProductsFound';

type Props = {
  products: Product[];
  name: string;
};

export const ProductsCatalog: React.FC<Props> = ({ products, name }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const correctPerPage = () => {
    return perPage === 'all'
      ? products.length
      : +perPage;
  };

  const [from, to] = [pagination.getFirstItem(correctPerPage(), +page),
    pagination.getLastItem(correctPerPage(), +page, products.length)];

  const phonesWithQuery = products
    .filter(product => product.name
      .toLowerCase().includes(query.toLowerCase().trim()));

  const phonesToRender = sortProducts(sortBy, products)
    .slice(from, to);

  if (phonesWithQuery.length === 0) {
    return (
      <NoProductsFound />
    );
  }

  return (
    <div className="products-catalog">

      {!query ? (
        <>
          <Breadcrumb />

          <div className="products-catalog__top">
            <h1 className="products-catalog__title title">
              {name}
            </h1>

            <p className="products-catalog__models">
              {`${products.length} models`}
            </p>
          </div>

          <div className="products-catalog__filter">
            <div className="products-catalog__sort-by">
              <p className="products-catalog__selector-name">Sort by</p>

              <Selector
                defaultValue={sortBy}
                searchParam="sort"
                values={SortBy}
              />
            </div>

            <div className="products-catalog__sort-by">
              <p className="products-catalog__selector-name">
                Items on page
              </p>

              <Selector
                defaultValue={perPage}
                searchParam="perPage"
                values={PerPage}
              />
            </div>
          </div>

          <div className="products-catalog__container">
            <div className="products-catalog__content">
              {phonesToRender.map(phone => (
                <ProductCard product={phone} key={phone.id} />
              ))}
            </div>
          </div>

          {perPage !== 'all' && (
            <div className="products-catalog__pagination">
              <Pagination
                total={products.length}
                perPage={correctPerPage()}
                currentPage={+page}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <p className="products-catalog__found">
            {`${phonesWithQuery.length} results`}
          </p>

          <div className="products-catalog__container">
            <div className="products-catalog__content">
              {phonesWithQuery.map(phone => (
                <ProductCard product={phone} key={phone.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
