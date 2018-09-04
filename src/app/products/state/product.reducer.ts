import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { ProductActionTypes, ProductActions } from './product.actions';

interface State extends fromRoot.State {
  products: ProductState;
}

interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  loadError?: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

const getLoadError = createSelector(
  getProductFeatureState,
  state => state.loadError
);

function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload }
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        loadError: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        loadError: action.payload
      };

    default:
      return state;
  }
}

export {
  State,
  ProductState,
  reducer,
  getShowProductCode,
  getCurrentProduct,
  getProducts,
  getLoadError
};
