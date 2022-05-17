import { Component, OnInit } from '@angular/core';
import { TarefaObservadorService } from '../../tarefa-observador.service';
import { TarefaObservador } from './../../tarefa-observador.module';

@Component({
  selector: 'app-tarefa-observador',
  templateUrl: './tarefa-observador.component.html',
  styleUrls: ['./tarefa-observador.component.css']
})
export class TarefaObservadorComponent implements OnInit {

  displayedColumns = ['id_tarefa', 'id_usuario_observador', 'nm_usuario'];
  tarefaObservador: TarefaObservador[] = []

  constructor(private tarefaObservadorService: TarefaObservadorService) { }

  ngOnInit(): void {
    this.tarefaObservadorService.read().subscribe(tarefaObservador => {
      this.tarefaObservador = tarefaObservador;
    });
  }

}
