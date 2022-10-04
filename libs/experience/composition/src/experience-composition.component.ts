import { hydratable, SSRAwaiterService } from '@spryker-oryx/core';
import {
  Component,
  ComponentsRegistryService,
  CompositionProperties,
  ExperienceService,
  LayoutBuilder,
} from '@spryker-oryx/experience';
import { resolve } from '@spryker-oryx/injector';
import { asyncValue, observe } from '@spryker-oryx/lit-rxjs';
import { isClient } from '@spryker-oryx/typescript-utils';
import { html, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import { ComponentMixin } from '../../src/mixins';
import {
  baseLayoutStyles,
  carouselLayoutStyles,
  columnLayoutStyles,
  containerLayoutStyles,
  stickyLayoutStyles,
} from './style';

@hydratable()
export class ExperienceCompositionComponent extends ComponentMixin<CompositionProperties>() {
  static styles = [
    baseLayoutStyles,
    carouselLayoutStyles,
    columnLayoutStyles,
    containerLayoutStyles,
    stickyLayoutStyles,
  ];

  @state()
  protected components?: Array<Component>;

  @property()
  uid = '';

  @observe()
  protected uid$ = new BehaviorSubject<string>(this.uid);

  @property()
  protected route = '';

  @observe()
  protected route$ = new BehaviorSubject<string>(this.route);

  protected experienceService = resolve(ExperienceService, null);
  protected registryService = resolve(ComponentsRegistryService);
  protected ssrAwaiter = resolve(SSRAwaiterService, null);
  protected hasSSR = false;
  protected isHydrated = false;

  protected layoutBuilder = resolve(LayoutBuilder);

  constructor() {
    super();
    this.hasSSR = !!this.shadowRoot;
  }

  protected components$ = combineLatest([this.uid$, this.route$]).pipe(
    switchMap(
      ([uid, route]) =>
        this.experienceService?.getComponent({ uid, route }) ||
        of({} as Component)
    ),
    map((component: Component) => component?.components ?? [])
  );

  // Can be safely used any time on or after calling getUpdateComplete().
  hydrateOnDemand(): void {
    if (!this.isHydrated) {
      this.isHydrated = true;
      this.requestUpdate();
    }
  }

  protected override render(): TemplateResult {
    return html`
      ${asyncValue(
        this.components$,
        (components) =>
          this.shadowRoot &&
          (this.shadowRoot?.children.length ?? 0) > 0 &&
          isClient() &&
          !this.isHydrated
            ? html`${[...this.shadowRoot.children]}`
            : components
            ? html`${repeat(
                components,
                (component) => component.id,
                (component) =>
                  html`${this.registryService.resolveTemplate(
                    component.type,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    component.id!,
                    this.getLayoutClasses(component)
                  )} `
              )}
              ${this.addInlineStyles(components)}`
            : html``,
        () => html`Loading...`
      )}
    `;
  }

  /**
   * collects the inline styles for the list of components and writes them
   * in a `<style>` tag.
   * The styles are unique to the component and are not reusable, hence it's
   * ok to render them inline. Rendering them inline will improve loading them
   * as additional resources, which would cause a layout shift.
   */
  protected addInlineStyles(
    components: Component[] | undefined
  ): TemplateResult {
    if (!components) return html``;
    const styles = this.layoutBuilder.collectStyles(components);
    if (styles !== '') {
      return html`${unsafeHTML(`<style>${styles}</style>`)}`;
    }

    return html``;
  }

  /**
   * returns the CSS classes for the given composition.
   */
  protected getLayoutClasses(component: Component): string | undefined {
    if (!component.options?.data) {
      return undefined;
    }
    return this.layoutBuilder.getLayoutClasses(component.options.data);
  }
}
