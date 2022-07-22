import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtividadeBacklogService } from 'src/app/modules/atividade-backlog/atividade-backlog.service';
import { TarefaService } from 'src/app/modules/tarefa/tarefa.service';

@Component({
  selector: 'app-atividade-backlog-detalhe',
  templateUrl: './atividade-backlog-detalhe.component.html',
  styleUrls: ['./atividade-backlog-detalhe.component.css']
})
export class AtividadeBacklogDetalheComponent implements OnInit {

  idAtividade: string = "";

  tarefas: any[] = [];
  atividadeBacklog: any;

  isActiveBtnGroup: boolean = false;

  constructor(
    private tarefaService: TarefaService,
    private atividadeBacklogService: AtividadeBacklogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAtividade = params["idAtividade"];
    });

    this._carregarDadosAPI();
  }

  private _carregarDadosAPI(): void {
    this.atividadeBacklogService.readById(this.idAtividade).subscribe(atividadeBacklog => {
      this.atividadeBacklog = atividadeBacklog;
    });

    this.tarefaService.read().subscribe(tarefas => {
      this.tarefas = tarefas;
      this.tarefas = this.tarefas.filter((tarefa: any) => tarefa.id_atividade == this.idAtividade);
      console.log(this.tarefas)
    });

    
  }

}