import { createReducer, on } from '@ngrx/store';
import { Product } from '../../modules/product/domain/product';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  LOADED_PRODUCTS,
  LOADING_PRODUCTS,
} from './actions';

export type AppStore = appState[];

export interface appState {
  loadingProducts: boolean;
  errorLoadingProducts: boolean;
  products: Product[];
}

export const initialState: appState = {
  products: [],
  loadingProducts: false,
  errorLoadingProducts: false,
};

export const globalReducer = createReducer(
  initialState,
  on(LOADING_PRODUCTS, (state) => {
    return {
      ...state,
      loadingProducts: true,
    };
  }),
  on(LOADED_PRODUCTS, (state, payload) => ({
    ...state,
    loadingProducts: false,
    errorLoadingProducts: false,
    products: payload.products,
  })),
  on(ADD_PRODUCT, (state, { product }) => {
    return {
      ...state,
      loadingProducts: false,
      errorLoadingProducts: false,
      products: [...state.products, product],
    };
  }),
  on(EDIT_PRODUCT, (state, { id, product }) => {
    return {
      ...state,
      loadingProducts: false,
      errorLoadingProducts: false,
      products: state.products.map((res) => {
        if (res.id === id) {
          return product;
        }
        return {
          ...res,
        };
      }),
    };
  }),
  on(DELETE_PRODUCT, (state, { productId }) => {
    return {
      ...state,
      loadingProducts: false,
      errorLoadingProducts: false,
      products: state.products.filter((product) => product.id !== productId),
    };
  })
);
