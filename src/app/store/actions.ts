import { createAction, props } from '@ngrx/store';
import { Product } from '../../modules/product/domain/product';

export const AppActions = {
  LoadingProducts: '[BANK_LIST Component] LOADING_PRODUCTS',
  LoadedProducts: '[BANK_LIST Component] LOADED_PRODUCTS',

  AddProduct: '[BANK_CREATE Component] ADD_PRODUCT',
  AddedProduct: 'ADDED_PRODUCT',

  DeleteProduct: '[BANK_LISTComponent] DELETE_PRODUCT',
  DeletedProduct: 'DELETED_PRODUCT',

  EditProduct: '[BANK_CREATE Component] EDIT_PRODUCT',
  EditedProduct: 'EDITED_PRODUCT',
};

export const LOADING_PRODUCTS = createAction(
  AppActions.LoadingProducts,
  props<{ options: { keyword: string; limit: number } }>()
);
export const LOADED_PRODUCTS = createAction(
  AppActions.LoadedProducts,
  props<{ products: Product[] }>()
);
export const ERROR_LOAD_PRODUCTS = createAction(
  '[BANK_LIST Component] ERROR_LOAD_PRODUCTS'
);

export const ADD_PRODUCT = createAction(
  AppActions.AddProduct,
  props<{ product: Product }>()
);
export const EDIT_PRODUCT = createAction(
  AppActions.EditProduct,
  props<{ id: string; product: Product }>()
);
export const DELETE_PRODUCT = createAction(
  AppActions.DeleteProduct,
  props<{ productId: string }>()
);
