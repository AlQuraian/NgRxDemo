import { Product } from "../product";
import { ProductActionTypes, ProductActions } from "./product.actions";

interface ProductState {
  readonly showProductCode: boolean;
  readonly currentProductId: number | null;
  readonly products: ReadonlyArray<Product>;
  readonly loadError?: string;
  readonly updateError?: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: []
};

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
  ProductState,
  reducer
};
