import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { ProductActionTypes, ProductActions } from './product.actions';

interface State extends fromRoot.State {
  products: ProductState;
}

interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  loadError?: string;
  updateError?: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: []
};

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
        currentProductId: action.payload.id
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
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

    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item);

      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        updateError: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        updateError: action.payload
      }

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
