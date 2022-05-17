import { Component, OnInit } from '@angular/core';
import { SituacaoTarefaService } from '../../situacao-tarefa.service';
import { SituacaoTarefa } from './../../situacao-tarefa.module';

@Component({
  selector: 'app-situacao-tarefa',
  templateUrl: './situacao-tarefa.component.html',
  styleUrls: ['./situacao-tarefa.component.css']
})
export class SituacaoTarefaComponent implements OnInit {

  displayedColumns = ['id_situacao_tarefa', 'ds_situacao_tarefa'];
  situacaoTarefa: SituacaoTarefa[] = []

  constructor(private situacaoTarefaService: SituacaoTarefaService) { }

  ngOnInit(): void {
    this.situacaoTarefaService.read().subscribe(situacaoTarefa => {
      this.situacaoTarefa = situacaoTarefa;
    });
  }

}
