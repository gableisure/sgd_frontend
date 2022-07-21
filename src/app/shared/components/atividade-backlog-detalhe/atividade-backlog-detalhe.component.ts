import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atividade-backlog-detalhe',
  templateUrl: './atividade-backlog-detalhe.component.html',
  styleUrls: ['./atividade-backlog-detalhe.component.css']
})
export class AtividadeBacklogDetalheComponent implements OnInit {

  idAtividade: string = "";
  dsAtividade: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idAtividade = params["idTed"];
      this.dsAtividade = params["dsAtividade"];
    });
  }

  /* Comentário para testar a funcionalidade do gitmoji */


}
