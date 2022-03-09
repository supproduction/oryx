import {
  RouterContract,
  RouterEvent,
  RouterEventType,
} from '@spryker-oryx/experience';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class RouterService implements RouterContract {
  private router = [];
  private routerEvents$: Subject<RouterEvent> = new Subject();

  go(route: string): void {
    this.router.push(route);
  }

  getEvents(type: RouterEventType): Observable<RouterEvent> {
    return this.routerEvents$.pipe(filter((event) => event.type === type));
  }
}
