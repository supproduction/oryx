import { provideQuery, Query } from '@spryker-oryx/core';
import { inject } from '@spryker-oryx/di';
import { Product, ProductQualifier } from '../../models';
import { ProductAdapter } from '../adapter';

export const ProductQuery = 'oryx.productQuery';

export type ProductQuery = Query<Product, ProductQualifier>;

export const productQueries = [
  provideQuery(ProductQuery, (adapter = inject(ProductAdapter)) => ({
    loader: (q: ProductQualifier) => adapter.get(q),
  })),
];
