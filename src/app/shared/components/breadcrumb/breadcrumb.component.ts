import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService, ItemBreadcrumb } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<ItemBreadcrumb[]>;

  constructor(
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    console.log(breadcrumbService.breadcrumb)
  }

  ngOnInit(): void {}
}
