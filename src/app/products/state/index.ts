import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import { ProductState } from './product.reducer';

interface State extends fromRoot.State {
  products: ProductState;
}
const getProductFeatureState =
  createFeatureSelector<ProductState>('products');

const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (!!currentProductId) {
      return state.products.find(p => p.id === currentProductId);
    }
    return {
      id: 0,
      productName: '',
      productCode: 'New',
      description: '',
      starRating: 0
    };
  }
);

const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

const getLoadError = createSelector(
  getProductFeatureState,
  state => state.loadError
);

export {
  State,
  getShowProductCode,
  getCurrentProduct,
  getProducts,
  getLoadError
};
