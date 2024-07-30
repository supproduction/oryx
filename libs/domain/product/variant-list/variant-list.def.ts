import { componentDef } from '@oryx-frontend/utilities';
import { ProductVariantListComponent } from './variant-list.component';

declare global {
  interface FeatureOptions {
    'oryx-product-variant-list'?: ProductVariantListComponent;
  }
}

export const productVariantListComponent = componentDef({
  name: 'oryx-product-variant-list',
  impl: () =>
    import('./variant-list.component').then(
      (m) => m.ProductVariantListComponent
    ),
});
