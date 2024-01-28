import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import './ProductDetailsPage.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeProduct,
  thunkGetProduct,
} from '../../features/productInfo/productInfoSlice';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';
import { PageNotFound } from '../PageNotFound';
import { getRandomProducts } from '../../api/api';
import { thunkGetProducts } from '../../features/product/productsSlice';
import { ProductSlider } from '../../components/ProductSlider';
import { ProductInfo } from '../../components/ProductInfo';
import { SomethingWentWrong } from '../../components/SomethingWentWrong';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(state => state.product);
  const { products } = useAppSelector(state => state.products);
  const normalizedPath = pathname.slice(1).split('/')[0];

  const goBack = () => {
    navigate(-1);
  };

  const loadProduct = useCallback(() => {
    if (itemId) {
      dispatch(thunkGetProduct({ id: itemId, name: normalizedPath }));
      dispatch(thunkGetProducts());
    }
  }, [dispatch, itemId, normalizedPath]);

  useEffect(() => {
    loadProduct();

    return () => {
      dispatch(removeProduct());
    };
  }, [dispatch, loadProduct]);

  const youMayAlsoLike = useMemo(() => {
    return getRandomProducts(products);
  }, [products]);

  if (loading && !error) {
    return (
      <div className="product-details__loader">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <SomethingWentWrong />
    );
  }

  if (!product) {
    return (
      <PageNotFound />
    );
  }

  const productSelected = products.find(pr => pr.itemId === product.id);

  if (!productSelected) {
    return (
      <PageNotFound />
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details">
        {!loading && !error && product && (
          <>
            <div className="product-details__nav">
              <Breadcrumb />

              <button
                className="product-details__back"
                onClick={goBack}
                aria-label="go-back"
                type="button"
              >
                <div className="icon icon-prev" />

                <p className="cart-page__text">
                  Back
                </p>
              </button>
            </div>

            <ProductInfo
              product={product}
              productSelected={productSelected}
            />
          </>
        )}
      </div>

      <section className="you-may-also-like">
        <ProductSlider
          title="You may also like"
          products={youMayAlsoLike}
        />
      </section>
    </div>
  );
};
