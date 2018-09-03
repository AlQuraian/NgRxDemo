import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Product } from "../product";
import * as fromRoot from '../../state/app.state';

interface State extends fromRoot.State {
  products: ProductState;
}

interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

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

function reducer(state: ProductState = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}

export { State, ProductState, reducer, getShowProductCode, getCurrentProduct, getProducts };
