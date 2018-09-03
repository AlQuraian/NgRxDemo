import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode$: Observable<boolean>;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null>;

  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.selectedProduct$ = this.productService.selectedProductChanges$;

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
