import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subject } from 'rxjs';

export interface ItemBreadcrumb {
  texto: string;
  url: string;
  queryParams?: {};
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly _breadcrumbs$ = new BehaviorSubject<ItemBreadcrumb[]>([]); 
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable(); 

  constructor(private router: Router) { 
    this.router.events.pipe( 
      filter((event) => event instanceof NavigationEnd) 
    ).subscribe(event => { 
      const root = this.router.routerState.snapshot.root; 
      const breadcrumbs: ItemBreadcrumb[] = []; 
      this.setBreadcrumb(root, [], breadcrumbs); 
 
      this._breadcrumbs$.next(breadcrumbs); 
    }); 
  } 
  public breadcrumb: ItemBreadcrumb[] = [];
  public breadcrumbAlterado: Subject<ItemBreadcrumb[]> = new Subject<ItemBreadcrumb[]>();

  public setBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: ItemBreadcrumb[]) {
    if (route) { 
      const routeUrl = parentUrl.concat(route.url.map(url => url.path)); 
      if (route.data['breadcrumb']) { 
        const breadcrumb = { 
          texto: this.getTexto(route.data), 
          url: '/' + routeUrl.join('/') 
        };
        console.log(breadcrumb)
        breadcrumbs.push(breadcrumb); 
      } 
      
      if(route.firstChild != null) {
        this.setBreadcrumb(route.firstChild, routeUrl, breadcrumbs); 
      }
    } 
  }

  private getTexto(data: Data) { 
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb']; 
  } 
}
