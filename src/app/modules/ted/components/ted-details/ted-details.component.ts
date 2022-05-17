import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/modules/usuario/usuario.module';
import { UsuarioService } from 'src/app/modules/usuario/usuario.service';
import { TedService } from '../../ted.service';
import { TedDetails } from './ted-details.module';
import { SituacaoTarefa } from './../../../situacao-tarefa/situacao-tarefa.module';
import { SituacaoTarefaService } from './../../../situacao-tarefa/situacao-tarefa.service';
import { TarefaService } from 'src/app/modules/tarefa/tarefa.service';
import { Tarefa } from 'src/app/modules/tarefa/tarefa.module';
import { ThisReceiver } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { TarefaDetailsDialogComponent } from 'src/app/modules/tarefa/components/tarefa-details-dialog/tarefa-details-dialog.component';

@Component({
  selector: 'app-ted-details',
  templateUrl: './ted-details.component.html',
  styleUrls: ['./ted-details.component.css']
})
export class TedDetailsComponent implements OnInit {
  
  @Input() id_ted: string = '';
  
  private sub: any;
  displayedColumns = ['ds_tarefa', 'ds_situacao_tarefa', 'solicitante', 'responsavel','dt_inicio_tarefa', 'dt_fim_tarefa', 'dt_inclusao'];
  usuarios: Usuario[] = [];
  tedDetails: TedDetails[] = [
    {
      id_tarefa: 0,
      id_ted: 0,
      ds_ted: '',
      ds_etapa: '',
      ds_atividade_etapa_eap: '',
      ds_atividade_backlog_etapa: '',
      ds_tarefa: '',
      id_tarefa_pai: 0,
      solicitante: '',
      responsavel: '',
      ds_situacao_tarefa: '',
      nr_regra_negocio: '',
      nr_historia_usuario: '',
      tx_observacao: '',
      dt_inicio_tarefa: '',
      dt_fim_tarefa: '',
      dt_inclusao: ''
      }
  ];

  tarefa: Tarefa = {
    id_tarefa: 0,
    id_ted: 0,
    ds_ted: '',
    id_etapa: 0,
    ds_etapa: '',
    id_atividade_etapa: 0,
    ds_atividade_etapa: '',
    id_atividade_backlog: 0,
    ds_atividade_backlog: '',
    ds_tarefa: '',
    id_tarefa_pai: 0,
    id_solicitante: 0,
    solicitante: '',
    id_responsavel: 0,
    responsavel: '',
    id_situacao_tarefa: 0,
    ds_situacao_tarefa: '',
    nr_regra_negocio: '',
    nr_historia_usuario: '',
    tx_observacao: '',
    dt_inicio_tarefa: '',
    dt_fim_tarefa: '',
    dt_inclusao: ''
  }

  tarefas: Tarefa[] = [];
  pesquisadoresTed: Usuario[] = [];
  situacaoTarefa: SituacaoTarefa[] = [];

  constructor(private tedService: TedService, private usuarioService: UsuarioService, private situacaoTarefaService: SituacaoTarefaService, private tarefaService: TarefaService, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id_ted = params['id'];
    });

    this.usuarioService.getUsersByIdTed(this.id_ted).subscribe(usuarios => {
      this.pesquisadoresTed = usuarios
      this.pesquisadoresTed.sort((a, b) => (a.nm_usuario.toUpperCase() < b.nm_usuario.toUpperCase()) ? -1 : 1)
    });

    this.tedService.getTedDetailsById(this.id_ted).subscribe(tedDetails => {
      this.tedDetails = tedDetails;
    });

    this.situacaoTarefaService.read().subscribe(situacaoTarefa => {
      this.situacaoTarefa = situacaoTarefa;
    });

    this.tarefaService.read().subscribe(tarefas => {
      this.tarefas = tarefas;
    });

  }

  openDialogTarefaDetails(id: number): void {
    const dialogRef = this.dialog.open(TarefaDetailsDialogComponent, {
      height: '500px',
      width: '700px',
    });
    dialogRef.componentInstance.id_tarefa = String(id);
  }

  updateSituacaoTarefa(id_tarefa: number, situacaoTarefa: SituacaoTarefa): void {
    this.tarefaService.readById(String(id_tarefa)).subscribe(tarefa => {
      this.tarefa = tarefa;
      this.tarefa.id_situacao_tarefa = situacaoTarefa.id_situacao_tarefa;
      this.tarefaService.updateSituacaoTarefa(this.tarefa).subscribe(newTarefa => {
        this.tarefaService.showMessage('Status da tarefa alterado com sucesso')
        window.location.reload();
      })
    });

  } 

}
