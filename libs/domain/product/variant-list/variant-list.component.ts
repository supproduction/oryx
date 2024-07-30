import { resolve } from '@oryx-frontend/di';
import { LayoutMixin } from '@oryx-frontend/experience';
import {
  ProductListPageService,
  ProductListService,
  ProductMixin,
} from '@oryx-frontend/product';
import { hydrate } from '@oryx-frontend/utilities';
import { LitElement, TemplateResult, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

@hydrate()
export class ProductVariantListComponent extends ProductMixin(
  LayoutMixin(LitElement)
) {
  protected productListService = resolve(ProductListService);
  protected productListPageService = resolve(ProductListPageService);

  protected override render(): TemplateResult {
    return html`
      ${this.renderLayout({
        template: this.renderList(),
      })}
    `;
  }

  protected renderList(): TemplateResult {
    console.log('variant list', this.$product()?.variants);
    return html`
      ${repeat(
        this.$product()?.variants ?? [],
        (p) => p.sku,
        (p) => html`<oryx-product-card .sku=${p.sku}></oryx-product-card>`
      )}
    `;
  }
}
