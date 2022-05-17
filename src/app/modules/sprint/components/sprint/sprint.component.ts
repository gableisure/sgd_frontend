import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../sprint.module';
import { SprintService } from './../../sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  displayedColumns = ['id_sprint', 'id_ted', 'ds_ted', 'dt_inicio', 'dt_fim'];
  sprint: Sprint[] = []

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    this.sprintService.read().subscribe(sprint => {
      this.sprint = sprint;
    });
  }

}
