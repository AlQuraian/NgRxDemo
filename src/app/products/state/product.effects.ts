import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { ProductService } from '../product.service';
import { ProductActionTypes, LoadSuccess, LoadFail } from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private service: ProductService) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    mergeMap(() =>
      this.service.getProducts()
        .pipe(
          map(products => new LoadSuccess(products)),
          catchError(err => of(new LoadFail(err)))
        )));
}
