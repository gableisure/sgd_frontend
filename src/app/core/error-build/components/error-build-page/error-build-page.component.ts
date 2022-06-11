import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-build-page',
  templateUrl: './error-build-page.component.html',
  styleUrls: ['./error-build-page.component.css']
})
export class ErrorBuildPageComponent implements OnInit {

  /* TODO */
  @Input() pageName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
