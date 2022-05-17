import { Component, OnInit } from '@angular/core';
import { SituacaoAtividade } from '../../situacao-atividade.module';
import { SituacaoAtividadeService } from '../../situacao-atividade.service';

@Component({
  selector: 'app-situacao-atividade',
  templateUrl: './situacao-atividade.component.html',
  styleUrls: ['./situacao-atividade.component.css']
})
export class SituacaoAtividadeComponent implements OnInit {

  displayedColumns = ['id_situacao_atividade', 'ds_situacao_atividade'];
  situacaoAtividade: SituacaoAtividade[] = []

  constructor(private situacaoAtividadeService: SituacaoAtividadeService) { }

  ngOnInit(): void {
    this.situacaoAtividadeService.read().subscribe(situacaoAtividade => {
      this.situacaoAtividade = situacaoAtividade;
    });
  }

}
