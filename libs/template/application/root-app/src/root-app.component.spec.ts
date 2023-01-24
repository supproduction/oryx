import { mockCartProviders } from '@spryker-oryx/cart/mocks';
import { ContextService, DefaultContextService } from '@spryker-oryx/core';
import { useComponent } from '@spryker-oryx/core/utilities';
import { createInjector, destroyInjector, getInjector } from '@spryker-oryx/di';
import { RouteParams, RouterService } from '@spryker-oryx/router';
import { LitRouter } from '@spryker-oryx/router/lit';
import { siteProviders } from '@spryker-oryx/site';
import { html } from 'lit';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SpyInstance } from 'vitest';
import { rootAppComponent } from './root-app.def';

class MockRouterService implements Partial<RouterService> {
  private router$ = new BehaviorSubject('');
  private params$: Subject<RouteParams> = new Subject();

  go(route: string): void {
    this.router$.next(route);
  }
  currentRoute(): Observable<string> {
    return this.router$;
  }
  currentParams(): Observable<RouteParams> {
    return this.params$;
  }
  acceptParams(params: RouteParams): void {
    this.params$.next(params);
  }
}

describe('RootAppComponent', () => {
  let routerService: MockRouterService;
  let litRouterOutletSpy: SpyInstance;

  beforeAll(async () => {
    await useComponent(rootAppComponent);
  });

  beforeEach(async () => {
    createInjector({
      providers: [
        {
          provide: ContextService,
          useClass: DefaultContextService,
        },
        {
          provide: RouterService,
          useClass: MockRouterService,
        },
        ...siteProviders,
        ...mockCartProviders,
      ],
    });

    routerService = getInjector().inject(
      RouterService
    ) as unknown as MockRouterService;
    routerService.go('/');

    litRouterOutletSpy = vi
      .spyOn(LitRouter.prototype, 'outlet')
      .mockReturnValue(html`mock-lit-router-outlet`);
  });

  afterEach(() => {
    destroyInjector();
  });

  it('should render `LitRouter.outlet()`', async () => {
    document.body.innerHTML = '<root-app></root-app>';

    await new Promise((res) => setTimeout(res));

    const rootApp = document.querySelector('root-app');

    expect(rootApp).toBeInstanceOf(HTMLElement);
    expect(rootApp!.shadowRoot?.innerHTML).toContain('mock-lit-router-outlet');
  });
});
