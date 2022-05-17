import { Component, OnInit } from '@angular/core';
import { AtividadeEtapaEapService } from '../../atividade-etapa-eap.service';
import { AtividadeEtapaEap } from './../../atividade-etapa-eap.module';

@Component({
  selector: 'app-atividade-etapa-eap',
  templateUrl: './atividade-etapa-eap.component.html',
  styleUrls: ['./atividade-etapa-eap.component.css']
})
export class AtividadeEtapaEapComponent implements OnInit {

  displayedColumns = ['id_atividade_etapa', 'id_etapa', 'ds_etapa', 'ds_atividade_etapa', 'dt_inicio_vigencia', 'dt_fim_vigencia'];
  atividadeEtapaEap: AtividadeEtapaEap[] = []

  constructor(private atividadeEtapaEapService: AtividadeEtapaEapService) { }

  ngOnInit(): void {
    this.atividadeEtapaEapService.read().subscribe(atividadeEtapaEap => {
      this.atividadeEtapaEap = atividadeEtapaEap;
    });
  }
}
