import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SituacaoTarefaService } from '../../situacao-tarefa.service';
import { SituacaoTarefaCreateDialogComponent } from '../situacao-tarefa-create-dialog/situacao-tarefa-create-dialog.component';
import { SituacaoTarefaUpdateDialogComponent } from '../situacao-tarefa-update-dialog/situacao-tarefa-update-dialog.component';
import { SituacaoTarefa } from './../../situacao-tarefa.module';

@Component({
  selector: 'app-situacao-tarefa',
  templateUrl: './situacao-tarefa.component.html',
  styleUrls: ['./situacao-tarefa.component.css']
})
export class SituacaoTarefaComponent implements OnInit {

  titlePage = 'Situação tarefa';
  displayedColumns = ['ds_situacao_tarefa', 'dt_inicio', 'dt_fim', 'status', 'actions'];
  situacaoTarefa: SituacaoTarefa[] = [];
  checkedInactive = false;

  constructor(private situacaoTarefaService: SituacaoTarefaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.situacaoTarefaService.read().subscribe(situacaoTarefa => {
      this.situacaoTarefa = situacaoTarefa;
      this.situacaoTarefa.forEach((situacaoTarefa) => {
        situacaoTarefa.status = situacaoTarefa.dt_fim == undefined ? true : false;
      });
      this.situacaoTarefa = this.situacaoTarefa.filter((situacaoTarefa) => situacaoTarefa.status == true);
      this.situacaoTarefa.sort((a, b) => (a.id_situacao_tarefa > b.id_situacao_tarefa) ? -1 : 1);
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(SituacaoTarefaUpdateDialogComponent, {
      height: '260px',
      width: '500px',
    });
    dialogRef.componentInstance.id_situacao_tarefa = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(SituacaoTarefaCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

  toggleStatus = (situacaoTarefa: SituacaoTarefa) => this.updateSituacaoTarefa(situacaoTarefa);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.situacaoTarefaService.read().subscribe(situacaoTarefa => this.situacaoTarefa = situacaoTarefa);
      this.situacaoTarefaService.read().subscribe((situacaoTarefa) => {
        this.situacaoTarefa = situacaoTarefa;
        this.situacaoTarefa.forEach((situacaoTarefa) => {
          situacaoTarefa.status = situacaoTarefa.dt_fim == undefined ? true : false;
        });
      });
    }else{
      this.situacaoTarefaService.read().subscribe((situacaoTarefa) => {
        this.situacaoTarefa = situacaoTarefa;
        this.situacaoTarefa.forEach((situacaoTarefa) => {
          situacaoTarefa.status = situacaoTarefa.dt_fim == undefined ? true : false;
        });
        this.situacaoTarefa = this.situacaoTarefa.filter((situacaoTarefa) => situacaoTarefa.status == true);
      });
    }
   }

   private updateSituacaoTarefa = (situacaoTarefa: SituacaoTarefa): void => {
    const dt_fim = new Date;

    if(situacaoTarefa.dt_fim) {
      situacaoTarefa.dt_fim = null;
    }else{
      situacaoTarefa.dt_fim = this._formatDateToEn(dt_fim.toISOString());
    }
    this.situacaoTarefaService.update(situacaoTarefa).subscribe(() => {
      this.situacaoTarefaService.showMessage('Situação da tarefa atualizada com sucesso');
    });
  }

  _formatDateToEn(date: string): string {
    const date_format = new Date(Date.parse(date));

    var dd = String(date_format.getDate()).padStart(2, '0');
    var mm = String(date_format.getMonth() + 1).padStart(2, '0');
    var yyyy = date_format.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

}
