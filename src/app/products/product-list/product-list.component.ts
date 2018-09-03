import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from '../state/product.reducer';
import { ToggleProductCode, SetCurrentProduct, InitializeCurrentProduct } from '../state/product.actions';

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
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

}
