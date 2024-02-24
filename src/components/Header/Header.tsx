/* eslint-disable react-hooks/exhaustive-deps */
import './Header.scss';
import {
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addSearch, removeSearch } from '../../features/product/productsSlice';
import { getSearchWith } from '../../helpers/searchHelper';
import { categoriesPath, categoriesWithInput } from '../../helpers/constants';
import { Logo } from '../Logo';

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isFavVisible, setIsFavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { favourites, cart } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const normalizedPath = pathname.slice(1);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    setIsVisible(categoriesWithInput.includes(normalizedPath));

    if (normalizedPath === 'favourites') {
      setIsFavVisible(!!favourites.length);
    }

    return () => setIsFavVisible(true);
  }, [pathname, favourites]);

  const applyQuery = useCallback(
    debounce((e) => dispatch(addSearch(e)), 500), [dispatch],
  );
  const applyQueryURL = useCallback(
    debounce((str) => setSearchParams(
      getSearchWith(searchParams, { query: str || null }),
    ),
    500), [searchParams, setSearchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    if (categoriesPath.includes(normalizedPath)) {
      applyQueryURL(newQuery.trim());
    } else {
      applyQuery(newQuery);
    }
  };

  const handleClear = () => {
    setQuery('');

    if (categoriesPath.includes(normalizedPath)) {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    } else {
      dispatch(removeSearch());
    }
  };

  useEffect(() => () => {
    setQuery('');

    if (!categoriesPath.includes(normalizedPath)) {
      dispatch(removeSearch());
    }
  }, [dispatch, pathname]);

  const isCart = normalizedPath === 'cart';

  const handeMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <Logo />

        {!isCart && (
          <div className="header__navigation">
            <Navigation />
          </div>
        )}
      </div>

      <div className="header__right">
        {isFavVisible && (
          isVisible && (
            <div className="header__search">
              <input
                type="text"
                value={query}
                onChange={handleChange}
                className="header__input"
                placeholder={`Search in ${normalizedPath}...`}
              />
              <div className="header__finder-container">
                {query ? (
                  <button
                    className="header__finder icon icon-close"
                    type="button"
                    aria-label="clear"
                    onClick={handleClear}
                  />
                ) : (
                  <button
                    className="header__finder icon icon-search"
                    type="button"
                    aria-label="find"
                  />
                )}
              </div>
            </div>
          )
        )}

        {!isCart && (
          <NavLink
            to="/favourites"
            className={({ isActive }) => cn('header__favourites', {
              'header__favourites-is-active': isActive,
            })}
          >
            <div className="icon icon-favourites header__favourites-img">
              {!!favourites.length && (
                <div className="header__img-status">
                  {favourites.length}
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink
          to="/cart"
          className={({ isActive }) => cn('header__cart', {
            'header__cart-is-active': isActive,
          })}
        >
          <div className="icon icon-cart header__cart-img">
            {!!cart.length && (
              <div className="header__img-status">
                {cart.length}
              </div>
            )}
          </div>
        </NavLink>

        {!isMenuOpen && (
          <button
            type="button"
            className="button--open-menu"
            aria-label="open-menu"
            onClick={handeMenuOpen}
          >
            <div className="icon icon-open-menu" />
          </button>
        )}

      </div>

      {isMenuOpen && (
        <aside className="menu">
          <div className="header">
            <Logo handeMenuOpen={handeMenuOpen} />

            <button
              type="button"
              className="button--open-menu"
              aria-label="open-menu"
              onClick={handeMenuOpen}
            >
              <div className="icon icon-close" />
            </button>
          </div>

          <div className="menu__navigation">
            <Navigation handeMenuOpen={handeMenuOpen} />
          </div>

          <div className="menu__bottom">
            <NavLink
              to="/favourites"
              className={({ isActive }) => cn('menu__favourites', {
                'menu__favourites-is-active': isActive,
              })}
              onClick={handeMenuOpen}
            >
              <div className="icon icon-favourites menu__favourites-img">
                {!!favourites.length && (
                  <div className="menu__img-status">
                    {favourites.length}
                  </div>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) => cn('menu__cart', {
                'menu__cart-is-active': isActive,
              })}
              onClick={handeMenuOpen}
            >
              <div className="icon icon-cart menu__cart-img">
                {!!cart.length && (
                  <div className="menu__img-status">
                    {cart.length}
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </aside>
      )}
    </header>
  );
};
