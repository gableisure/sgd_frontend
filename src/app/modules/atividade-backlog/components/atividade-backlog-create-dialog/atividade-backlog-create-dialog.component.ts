import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AtividadeEtapaEap } from 'src/app/modules/atividade-etapa-eap/atividade-etapa-eap.module';
import { EtapaEap } from 'src/app/modules/etapa-eap/etapa-eap.module';
import { EtapaEapService } from 'src/app/modules/etapa-eap/etapa-eap.service';
import { PrioridadeAtividade } from 'src/app/modules/prioridade-atividade/prioridade-atividade.module';
import { PrioridadeAtividadeService } from 'src/app/modules/prioridade-atividade/prioridade-atividade.service';
import { SituacaoAtividade } from 'src/app/modules/situacao-atividade/situacao-atividade.module';
import { SituacaoAtividadeService } from 'src/app/modules/situacao-atividade/situacao-atividade.service';
import { Sprint } from 'src/app/modules/sprint/sprint.module';
import { SprintService } from 'src/app/modules/sprint/sprint.service';
import { TedDetalheService } from 'src/app/shared/components/ted-detalhe/ted-detalhe.service';
import { AtividadeBacklogService } from '../../atividade-backlog.service';

@Component({
  selector: 'app-atividade-backlog-create-dialog',
  templateUrl: './atividade-backlog-create-dialog.component.html',
  styleUrls: ['./atividade-backlog-create-dialog.component.css']
})
export class AtividadeBacklogCreateDialogComponent implements OnInit {

  etapaEap: EtapaEap[] = [];
  atividadeEtapaEap: AtividadeEtapaEap[] = [];
  situacaoAtividade: SituacaoAtividade[] = [];
  prioridadeAtividade: PrioridadeAtividade[] = [];
  sprint: Sprint[] = [];

  valoresFormulario: any = {
    "id_atividade_etapa": 0,
    "ds_atividade_etapa": "",
    "ds_detalhe_atividade": "",
    "id_sprint": 0,
    "id_situacao_atividade": 0,
    "id_prioridade_atividade": 0,
  };
  
  constructor(
    private tedDetalheService: TedDetalheService,
    private etapaEapService: EtapaEapService,
    private atividadeBacklogService: AtividadeBacklogService,
    private situacaoAtividadeService: SituacaoAtividadeService,
    private prioridadeAtividadeService: PrioridadeAtividadeService,
    private sprintService: SprintService,
    public dialogRef: MatDialogRef<AtividadeBacklogCreateDialogComponent>
  ) { }

  ngOnInit(): void {
    this.carregaValoresAPI();
  }

  private carregaValoresAPI(): void {

    this.etapaEapService.read().subscribe(etapaEap => {
      this.etapaEap = etapaEap;
    });

    this.situacaoAtividadeService.read().subscribe(situacaoAtividade => {
      this.situacaoAtividade = situacaoAtividade;
    });

    this.prioridadeAtividadeService.read().subscribe(prioridadeAtividade => {
      this.prioridadeAtividade = prioridadeAtividade;
      this.prioridadeAtividade.forEach((prioridadeAtividade) => {
        if(prioridadeAtividade.ds_prioridade_atividade == "Alta") {
          prioridadeAtividade.nome_icone = "keyboard_arrow_up";
          prioridadeAtividade.classe_icone = "icon-prioridade-atividade-alta";
        }else if(prioridadeAtividade.ds_prioridade_atividade == "Média") {
          prioridadeAtividade.nome_icone = "drag_handle";
          prioridadeAtividade.classe_icone = "icon-prioridade-atividade-media";
        }else if(prioridadeAtividade.ds_prioridade_atividade == "Baixa") {
          prioridadeAtividade.nome_icone = "keyboard_arrow_down";
          prioridadeAtividade.classe_icone = "icon-prioridade-atividade-baixa";
        }
      });
      this.prioridadeAtividade.forEach((prioridadeAtividade) => {
        prioridadeAtividade.status = prioridadeAtividade.dt_fim_vigencia == undefined ? true : false;
        if (prioridadeAtividade.dt_fim_vigencia != null) prioridadeAtividade.dt_fim_vigencia = this.etapaEapService.formatDateToISODate(prioridadeAtividade.dt_fim_vigencia);
        prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
      });
      this.prioridadeAtividade = this.prioridadeAtividade.filter((prioridadeAtividade) => prioridadeAtividade.status == true);
      this.prioridadeAtividade.sort((a, b) => (a.id_prioridade_atividade > b.id_prioridade_atividade) ? -1 : 1);
    });
    
    this.sprintService.read().subscribe(sprint => {
      this.sprint = sprint;
      
    });

  }

  onChangeEtapaEap(idEtapa: Number) {
    this.tedDetalheService.readAtividadeEtapaEapByIdEtapa(String(idEtapa)).subscribe(atividadeEtapaEap => {
      this.atividadeEtapaEap = atividadeEtapaEap;
    });
  }

  salvarAtividade(): void {
    console.log(this.valoresFormulario);
    this.atividadeBacklogService.create(this.valoresFormulario).subscribe(() => {
      this.dialogRef.close();
      this.tedDetalheService.showMessage('Atividade criada com sucesso!');
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
