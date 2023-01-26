import { resolve } from '@spryker-oryx/di';
import {
  ComponentMixin,
  ContentController,
  defaultOptions,
} from '@spryker-oryx/experience';
import { Facet } from '@spryker-oryx/product';
import { RouterService } from '@spryker-oryx/router';
import { FacetSelect } from '@spryker-oryx/search/facet';
import { asyncValue, hydratable } from '@spryker-oryx/utilities';
import { html, TemplateResult } from 'lit';
import { combineLatest } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FacetComponentRegistryService } from '../../src/renderers';
import { FacetListService } from '../../src/services/facet-list.service';
import { FacetsOptions } from './facet-navigation.model';
import { facetNavigation } from './facet-navigation.styles';

@hydratable(['mouseover', 'focusin'])
@defaultOptions({ expandedItemsCount: 5, valueRenderLimit: 5 })
export class SearchFacetNavigationComponent extends ComponentMixin<FacetsOptions>() {
  static styles = [facetNavigation];

  protected options$ = new ContentController(this).getOptions();
  protected facetListService = resolve(FacetListService);
  protected routerService = resolve(RouterService);
  protected facetRenderer = resolve(FacetComponentRegistryService);

  protected facets$ = combineLatest([
    this.facetListService.get(),
    this.options$,
  ]);

  protected applyFilters(e: CustomEvent<FacetSelect>): void {
    const { name, value: selectedFacetValue } = e.detail;

    this.facetListService
      .get()
      .pipe(take(1))
      .subscribe((facets) => {
        const facet = facets?.find((facet) => facet.name === name);
        if (!facet) return;
        if (!selectedFacetValue) {
          this.facetNavigation(facet.parameter, []);
          return;
        }

        const values = facet.multiValued
          ? [
              ...(facet.selectedValues ?? []),
              ...(selectedFacetValue.selected
                ? [selectedFacetValue.value]
                : []),
            ].filter(
              (selectedValue) =>
                selectedFacetValue.selected ||
                selectedValue !== selectedFacetValue.value
            )
          : [selectedFacetValue.value];

        this.facetNavigation(facet.parameter, values as string[]);
      });
  }

  protected facetNavigation(parameter: string, values: string[]): void {
    this.routerService
      .getUrl('', {
        queryParams: {
          [parameter.toLowerCase()]: values,
        },
        queryParamsHandling: 'merge',
      })
      .pipe(tap((url) => this.routerService.navigate(url)))
      .subscribe();
  }

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(this.facets$, ([facets, options]) => {
        return this.renderFacets(facets, options);
      })}
    `;
  }

  protected renderFacets(
    facets: Facet[] | null,
    options: FacetsOptions
  ): TemplateResult {
    return html`${(facets ?? []).map((facet, index) => {
      return this.facetRenderer.renderFacetComponent(
        facet,
        {
          renderLimit: options.valueRenderLimit!,
          open: index < (options.expandedItemsCount ?? 0),
        },
        this.applyFilters.bind(this)
      );
    })}`;
  }
}
