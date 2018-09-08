/* Defines the product entity */
export interface Product {
  readonly id: number | null;
  readonly productName: string;
  readonly productCode: string;
  readonly description: string;
  readonly starRating: number;
}

