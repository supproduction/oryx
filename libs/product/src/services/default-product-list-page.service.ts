import { RouterService } from '@spryker-oryx/experience';
import { inject } from '@spryker-oryx/injector';
import { NullableGeneric } from '@spryker-oryx/utilities/typescript';
import { Observable, switchMap } from 'rxjs';
import { ProductList, ProductListQualifier } from '../models';
import { ProductListPageService } from './product-list-page.service';
import { ProductListService } from './product-list.service';

export class DefaultProductListPageService implements ProductListPageService {
  constructor(
    protected routerService = inject(RouterService),
    protected productListService = inject(ProductListService)
  ) {}

  get(): Observable<NullableGeneric<ProductList>> {
    return this.routerService
      .currentQuery()
      .pipe(
        switchMap((params) =>
          this.productListService.get(params as ProductListQualifier)
        )
      );
  }
}
