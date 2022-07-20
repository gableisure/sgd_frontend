import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AtividadeBacklogService } from 'src/app/modules/atividade-backlog/atividade-backlog.service';
import { AtividadeBacklogCreateDialogComponent } from 'src/app/modules/atividade-backlog/components/atividade-backlog-create-dialog/atividade-backlog-create-dialog.component';
import { SituacaoAtividade } from 'src/app/modules/situacao-atividade/situacao-atividade.module';
import { SituacaoAtividadeService } from 'src/app/modules/situacao-atividade/situacao-atividade.service';
import { TedDetalheService } from './ted-detalhe.service';
import { AtividadeBacklog } from '../../../modules/atividade-backlog/atividade-backlog.module';
import { PrioridadeAtividade } from 'src/app/modules/prioridade-atividade/prioridade-atividade.module';
import { PrioridadeAtividadeService } from 'src/app/modules/prioridade-atividade/prioridade-atividade.service';

@Component({
  selector: 'app-ted-detalhe',
  templateUrl: './ted-detalhe.component.html',
  styleUrls: ['./ted-detalhe.component.css']
})
export class TedDetalheComponent implements OnInit {
  
  idTed: String = "";
  titleTed: String = "";

  atividadesBacklog: any = [];
  situacoesAtividade: SituacaoAtividade[] = [];
  prioridadesAtividade: PrioridadeAtividade[] = [];

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
    private situacaoAtividadeService: SituacaoAtividadeService,
    private prioridadeAtividadeService: PrioridadeAtividadeService,
  ) { }

  ngOnInit(): void {
    this.idTed = this.activatedRoute.snapshot.params["idTed"];
    this._carregarDadosAPI();
  }

  private _carregarDadosAPI(): void {
    /* Carrega dados tb_atividade_backlog */
    this.atividadeBacklogService.read().subscribe(atividadesBacklog => {
      this.atividadesBacklog = atividadesBacklog;
      this.titleTed =  this.atividadesBacklog[0].tb_sprint.tb_ted_unb.ds_ted;

      /* Filtra as atividades pelo id da TED */
      this.atividadesBacklog = this.atividadesBacklog.filter((atividadeBacklog: any) => atividadeBacklog.tb_sprint.tb_ted_unb.id_ted == this.idTed);

      /* Pecorre todas as atividades a ajusta o formata a data para o formato brasileiro */
      this.atividadesBacklog.forEach((atividadeBacklog: any) => {
        atividadeBacklog.dt_inicio_vigencia = this.tedDetalheService.formatDateToISODate(atividadeBacklog.dt_inicio_vigencia);
        if(atividadeBacklog.tb_situacao_atividade.ds_situacao_atividade == "Finalizada") atividadeBacklog.tb_situacao_atividade.classe = "icon-situacao finalizada";
        if(atividadeBacklog.tb_situacao_atividade.ds_situacao_atividade == "Em andamento") atividadeBacklog.tb_situacao_atividade.classe = "icon-situacao em-andamento";
        if(atividadeBacklog.tb_situacao_atividade.ds_situacao_atividade == "Em homologação") atividadeBacklog.tb_situacao_atividade.classe = "icon-situacao em-homologacao";
        if(atividadeBacklog.tb_situacao_atividade.ds_situacao_atividade == "Bloqueada") atividadeBacklog.tb_situacao_atividade.classe = "icon-situacao bloqueada";
        if(atividadeBacklog.tb_prioridade_atividade.ds_prioridade_atividade == "Alta") {
          atividadeBacklog.tb_prioridade_atividade.nome_icone = "keyboard_arrow_up";
          atividadeBacklog.tb_prioridade_atividade.classe = "icon-prioridade-atividade-alta";
        }else if(atividadeBacklog.tb_prioridade_atividade.ds_prioridade_atividade == "Média") {
          atividadeBacklog.tb_prioridade_atividade.nome_icone = "drag_handle";
          atividadeBacklog.tb_prioridade_atividade.classe = "icon-prioridade-atividade-media";
        }else if(atividadeBacklog.tb_prioridade_atividade.ds_prioridade_atividade == "Baixa") {
          atividadeBacklog.tb_prioridade_atividade.nome_icone = "keyboard_arrow_down";
          atividadeBacklog.tb_prioridade_atividade.classe = "icon-prioridade-atividade-baixa";
        }
      });

      /* Ordena as atividades em ordem decrescente de data de início */
      this.atividadesBacklog.sort((a: any, b: any) => (a.dt_inicio_vigencia > b.dt_inicio_vigencia) ? -1 : 1);
    });

    /* Carrega dados tb_situacao_atividade */
    this.situacaoAtividadeService.read().subscribe(situacoesAtividade => {
      this.situacoesAtividade = situacoesAtividade;
      this.situacoesAtividade = this.situacoesAtividade.filter((situacaoAtividade) => situacaoAtividade.dt_fim_vigencia == null);

      /* Pecorre todas as situações da atividade e define a classe de cada situação da atividade */
      this.situacoesAtividade.forEach((situacaoAtividade: any) => {
        if(situacaoAtividade.ds_situacao_atividade == "Finalizada") situacaoAtividade.classe = "icon-situacao finalizada";
        if(situacaoAtividade.ds_situacao_atividade == "Em andamento") situacaoAtividade.classe = "icon-situacao em-andamento";
        if(situacaoAtividade.ds_situacao_atividade == "Em homologação") situacaoAtividade.classe = "icon-situacao em-homologacao";
        if(situacaoAtividade.ds_situacao_atividade == "Bloqueada") situacaoAtividade.classe = "icon-situacao bloqueada";
      });
    });

    /* Carrega dados tb_prioridade_atividade */
    this.prioridadeAtividadeService.read().subscribe(prioridadesAtividade => {
      this.prioridadesAtividade = prioridadesAtividade;
      this.prioridadesAtividade.forEach((prioridadeAtividade) => {
        prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
        if(prioridadeAtividade.ds_prioridade_atividade == "Alta") {
          prioridadeAtividade.nome_icone = "keyboard_arrow_up";
          prioridadeAtividade.classe = "icon-prioridade-atividade-alta";
        }else if(prioridadeAtividade.ds_prioridade_atividade == "Média") {
          prioridadeAtividade.nome_icone = "drag_handle";
          prioridadeAtividade.classe = "icon-prioridade-atividade-media";
        }else if(prioridadeAtividade.ds_prioridade_atividade == "Baixa") {
          prioridadeAtividade.nome_icone = "keyboard_arrow_down";
          prioridadeAtividade.classe = "icon-prioridade-atividade-baixa";
        }
      });
      this.prioridadesAtividade = this.prioridadesAtividade.filter((prioridadeAtividade) => prioridadeAtividade.dt_fim_vigencia == null);
      console.log(this.prioridadesAtividade)
    });

  }

  selectedSituacao(id_situacao_atividade: number, atividadeBacklog: any): void{
    const body = {
      id_atividade: atividadeBacklog.id_atividade,
      id_situacao_atividade: id_situacao_atividade
    }

    this.atividadeBacklogService.update(body).subscribe(() => {
      window.location.reload();
    });
  }

  openDialogCreate(): void {
    this.dialog.open(AtividadeBacklogCreateDialogComponent, {
      height: '800px',
      width: '900px',
    });
  }

}
