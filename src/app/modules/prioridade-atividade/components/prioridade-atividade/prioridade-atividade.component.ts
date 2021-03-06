import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrioridadeAtividade } from '../../prioridade-atividade.module';
import { PrioridadeAtividadeCreateDialogComponent } from '../prioridade-atividade-create-dialog/prioridade-atividade-create-dialog.component';
import { PrioridadeAtividadeUpdateDialogComponent } from '../prioridade-atividade-update-dialog/prioridade-atividade-update-dialog.component';
import { PrioridadeAtividadeService } from './../../prioridade-atividade.service';

@Component({
  selector: 'app-prioridade-atividade',
  templateUrl: './prioridade-atividade.component.html',
  styleUrls: ['./prioridade-atividade.component.css']
})
export class PrioridadeAtividadeComponent implements OnInit {

  titlePage = 'Prioridade atividade';
  displayedColumns = ['ds_prioridade_atividade', 'dt_inicio_vigencia', 'dt_fim_vigencia', 'status', 'actions'];
  prioridadeAtividade: PrioridadeAtividade[] = [];
  checkedInactive = false;

  constructor(private prioridadeAtividadeService: PrioridadeAtividadeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.prioridadeAtividadeService.read().subscribe(prioridadeAtividade => {
      this.prioridadeAtividade = prioridadeAtividade;
      this.prioridadeAtividade.forEach((prioridadeAtividade) => {
        prioridadeAtividade.status = prioridadeAtividade.dt_fim_vigencia == undefined ? true : false;
        if (prioridadeAtividade.dt_fim_vigencia != null) prioridadeAtividade.dt_fim_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_fim_vigencia);
        prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
      });
      this.prioridadeAtividade = this.prioridadeAtividade.filter((prioridadeAtividade) => prioridadeAtividade.status == true);
      this.prioridadeAtividade.sort((a, b) => (a.id_prioridade_atividade > b.id_prioridade_atividade) ? -1 : 1);
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(PrioridadeAtividadeUpdateDialogComponent, {
      height: '260px',
      width: '500px',
    });
    dialogRef.componentInstance.id_prioridade_atividade = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(PrioridadeAtividadeCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

  toggleStatus = (prioridadeAtividade: PrioridadeAtividade) => this.updateprioridadeAtividade(prioridadeAtividade);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.prioridadeAtividadeService.read().subscribe(prioridadeAtividade => this.prioridadeAtividade = prioridadeAtividade);
      this.prioridadeAtividadeService.read().subscribe((prioridadeAtividade) => {
        this.prioridadeAtividade = prioridadeAtividade;
        this.prioridadeAtividade.forEach((prioridadeAtividade) => {
          prioridadeAtividade.status = prioridadeAtividade.dt_fim_vigencia == undefined ? true : false;
          if (prioridadeAtividade.dt_fim_vigencia != null) prioridadeAtividade.dt_fim_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_fim_vigencia);
          prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
        });
      });
    }else{
      this.prioridadeAtividadeService.read().subscribe((prioridadeAtividade) => {
        this.prioridadeAtividade = prioridadeAtividade;
        this.prioridadeAtividade.forEach((prioridadeAtividade) => {
          prioridadeAtividade.status = prioridadeAtividade.dt_fim_vigencia == undefined ? true : false;
          if (prioridadeAtividade.dt_fim_vigencia != null) prioridadeAtividade.dt_fim_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_fim_vigencia);
          prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
        });
        this.prioridadeAtividade = this.prioridadeAtividade.filter((prioridadeAtividade) => prioridadeAtividade.status == true);
        
      });
    }
   }

  private updateprioridadeAtividade = (prioridadeAtividade: PrioridadeAtividade): void => {
    const dt_fim = new Date;

    if(prioridadeAtividade.dt_fim_vigencia) {
      prioridadeAtividade.dt_fim_vigencia = null;
    }else{
      prioridadeAtividade.dt_fim_vigencia = dt_fim.toISOString();
    }
    prioridadeAtividade.dt_inicio_vigencia = this.prioridadeAtividadeService.formatDateToISODate(prioridadeAtividade.dt_inicio_vigencia);
    this.prioridadeAtividadeService.update(prioridadeAtividade).subscribe(() => {
      this.prioridadeAtividadeService.showMessage('Prioridade da atividade atualizada com sucesso');
    });
  }

}
