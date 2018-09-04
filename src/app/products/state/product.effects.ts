import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { ProductService } from '../product.service';
import {
  ProductActionTypes,
  LoadSuccess,
  LoadFail,
  UpdateProduct,
  UpdateProductSuccess,
  UpdateProductFail
} from './product.actions';
import { Product } from '../product';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private service: ProductService) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActionTypes.Load),
      mergeMap(() =>
        this.service.getProducts()
          .pipe(
            map(products => new LoadSuccess(products)),
            catchError(err => of(new LoadFail(err)))
          ))
    );

  // @Effect()
  // updateProduct$: Observable<Action> = this.actions$.pipe(
  //   ofType(ProductActionTypes.UpdateProduct),
  //   map((action: UpdateProduct) => action.payload),
  //   mergeMap((product: Product) =>
  //     this.service.updateProduct(product).pipe(
  //       map(updatedProduct => (new UpdateProductSuccess(updatedProduct))),
  //       catchError(err => of(new UpdateProductFail(err)))
  //     )
  //   )
  // );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType<UpdateProduct>(ProductActionTypes.UpdateProduct),
      mergeMap(a =>
        this.service.updateProduct(a.payload)
          .pipe(
            map(product => new UpdateProductSuccess(product)),
            catchError(err => of(new UpdateProductFail(err)))
          ))
    );

}
