import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { ApiProductRepository } from '../../modules/product/infrastructure/product-service.repository';
import { createProduct } from '../../modules/product/application/create/create-product';
import { getAllProducts } from '../../modules/product/application/get-all/get-all-products';

import { AppActions } from './actions';
import { deleteOneProduct } from '../../modules/product/application/delete/delete-one-product';
import { updateOneProduct } from '../../modules/product/application/update/update-one-product';

@Injectable({ providedIn: 'root' })
export class AppEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.LoadingProducts),
      exhaustMap((action) =>
        from(
          getAllProducts(this.productService, (action as any)?.options)
        ).pipe(
          map((products) => ({
            type: AppActions.LoadedProducts,
            products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.AddProduct),
      exhaustMap((action) =>
        from(createProduct(this.productService, (action as any)?.product)).pipe(
          map((products) => ({
            type: AppActions.AddedProduct,
            products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.EditProduct),
      exhaustMap((action) =>
        from(
          updateOneProduct(
            this.productService,
            (action as any)?.id,
            (action as any)?.product
          )
        ).pipe(
          map((products) => ({
            type: AppActions.EditedProduct,
            products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.DeleteProduct),
      exhaustMap((action) =>
        from(
          deleteOneProduct(this.productService, (action as any)?.productId)
        ).pipe(
          map((products) => ({
            type: AppActions.DeleteProduct,
            products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ApiProductRepository
  ) {}
}
