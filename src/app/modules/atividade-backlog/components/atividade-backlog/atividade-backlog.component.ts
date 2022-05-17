import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AtividadeBacklog } from '../../atividade-backlog.module';
import { AtividadeBacklogService } from '../../atividade-backlog.service';

@Component({
  selector: 'app-atividade-backlog',
  templateUrl: './atividade-backlog.component.html',
  styleUrls: ['./atividade-backlog.component.css']
})
export class AtividadeBacklogComponent implements OnInit {

  displayedColumns = [
    'id_atividade',
    'id_atividade_etapa_eap',
    'ds_atividade_etapa',
    'ds_detalhe_atividade',
    'id_situacao_atividade',
    'id_prioridade_atividade',
    'id_sprint',
    'id_ted',
    'dt_inicio_atividade',
    'dt_fim_atividade'
  ];
  atividadeBacklog: AtividadeBacklog[] = []
  dataSource: MatTableDataSource<AtividadeBacklog> | undefined;

  constructor(private atividadeBacklogService: AtividadeBacklogService) { }

  @ViewChild('paginator') paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.atividadeBacklog);
  }
  
  ngOnInit(): void {
    this.atividadeBacklogService.read().subscribe(atividadeBacklog => {
      this.atividadeBacklog = atividadeBacklog;
    });
  }

}
