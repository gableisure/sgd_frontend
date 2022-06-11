import { Component, OnInit } from '@angular/core';
import { Ted } from 'src/app/modules/ted/ted.module';
import { TedService } from 'src/app/modules/ted/ted.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teds: Ted[] = [];
  
  
  constructor(private tedService: TedService) { }

  ngOnInit(): void {
    this.tedService.read().subscribe(teds => {
      this.teds = teds;
    });
  }

}
