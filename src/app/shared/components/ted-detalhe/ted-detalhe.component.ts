import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AtividadeBacklogService } from 'src/app/modules/atividade-backlog/atividade-backlog.service';
import { AtividadeBacklogCreateDialogComponent } from 'src/app/modules/atividade-backlog/components/atividade-backlog-create-dialog/atividade-backlog-create-dialog.component';
import { TedDetalheService } from './ted-detalhe.service';

@Component({
  selector: 'app-ted-detalhe',
  templateUrl: './ted-detalhe.component.html',
  styleUrls: ['./ted-detalhe.component.css']
})
export class TedDetalheComponent implements OnInit {
  
  idTed: String = "";
  titleTed: String = "";

  atividadesBacklog: any = [];

  displayedColumns = [
    'atividade',
    'situacao',
    'prioridade',
    'sprint'
  ];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private tedDetalheService: TedDetalheService,
    private atividadeBacklogService: AtividadeBacklogService,
  ) { }

  ngOnInit(): void {
    this.idTed = this.activatedRoute.snapshot.params["idTed"];
    this.atividadeBacklogService.read().subscribe(atividadesBacklog => {
      this.atividadesBacklog = atividadesBacklog;
      this.titleTed =  this.atividadesBacklog[0].tb_sprint.tb_ted_unb.ds_ted;

      /* Filtra as atividades pelo id da TED */
      this.atividadesBacklog = this.atividadesBacklog.filter((atividadeBacklog: any) => atividadeBacklog.tb_sprint.tb_ted_unb.id_ted == this.idTed);

      /* Pecorre todas as atividades a ajusta o formata a data para o formato brasileiro */
      this.atividadesBacklog.forEach((atividadeBacklog: any) => {
        atividadeBacklog.dt_inicio_vigencia = this.tedDetalheService.formatDateToISODate(atividadeBacklog.dt_inicio_vigencia);
      });

      /* Ordena as atividades em ordem decrescente de data de início */
      this.atividadesBacklog.sort((a: any, b: any) => (a.dt_inicio_vigencia > b.dt_inicio_vigencia) ? -1 : 1);
      
    });
    
  }

  openDialogCreate(): void {
    this.dialog.open(AtividadeBacklogCreateDialogComponent, {
      height: '800px',
      width: '900px',
    });
  }

}
