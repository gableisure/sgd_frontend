import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SituacaoAtividade } from '../../situacao-atividade.module';
import { SituacaoAtividadeService } from '../../situacao-atividade.service';
import { SituacaoAtividadeCreateDialogComponent } from '../situacao-atividade-create-dialog/situacao-atividade-create-dialog.component';
import { SituacaoAtividadeUpdateDialogComponent } from '../situacao-atividade-update-dialog/situacao-atividade-update-dialog.component';

@Component({
  selector: 'app-situacao-atividade',
  templateUrl: './situacao-atividade.component.html',
  styleUrls: ['./situacao-atividade.component.css']
})
export class SituacaoAtividadeComponent implements OnInit {

  titlePage = 'Situação atividade';
  displayedColumns = ['id_situacao_atividade', 'ds_situacao_atividade', 'dt_inicio', 'dt_fim', 'status', 'actions'];
  situacaoAtividade: SituacaoAtividade[] = [];
  checkedInactive = false;

  constructor(private situacaoAtividadeService: SituacaoAtividadeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.situacaoAtividadeService.read().subscribe(situacaoAtividade => {
      this.situacaoAtividade = situacaoAtividade;
      this.situacaoAtividade.forEach((situacaoAtividade) => {
        situacaoAtividade.status = situacaoAtividade.dt_fim == undefined ? true : false;
      });
      this.situacaoAtividade = this.situacaoAtividade.filter((situacaoAtividade) => situacaoAtividade.status == true);
      this.situacaoAtividade.sort((a, b) => (a.id_situacao_atividade > b.id_situacao_atividade) ? -1 : 1);
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(SituacaoAtividadeUpdateDialogComponent, {
      height: '260px',
      width: '500px',
    });
    dialogRef.componentInstance.id_situacao_atividade = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(SituacaoAtividadeCreateDialogComponent, {
      height: '260px',
      width: '500px',
    });
  }

  toggleStatus = (situacaoAtividade: SituacaoAtividade) => this.updateSituacaoAtividade(situacaoAtividade);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.situacaoAtividadeService.read().subscribe(situacaoAtividade => this.situacaoAtividade = situacaoAtividade);
      this.situacaoAtividadeService.read().subscribe((situacaoAtividade) => {
        this.situacaoAtividade = situacaoAtividade;
        this.situacaoAtividade.forEach((situacaoAtividade) => {
          situacaoAtividade.status = situacaoAtividade.dt_fim == undefined ? true : false;
        });
      });
    }else{
      this.situacaoAtividadeService.read().subscribe((situacaoAtividade) => {
        this.situacaoAtividade = situacaoAtividade;
        this.situacaoAtividade.forEach((situacaoAtividade) => {
          situacaoAtividade.status = situacaoAtividade.dt_fim == undefined ? true : false;
        });
        this.situacaoAtividade = this.situacaoAtividade.filter((situacaoAtividade) => situacaoAtividade.status == true);
      });
    }
   }

   private updateSituacaoAtividade = (situacaoAtividade: SituacaoAtividade): void => {
    const dt_fim = new Date;

    if(situacaoAtividade.dt_fim) {
      situacaoAtividade.dt_fim = null;
    }else{
      situacaoAtividade.dt_fim = this._formatDateToEn(dt_fim.toISOString());
    }
    this.situacaoAtividadeService.update(situacaoAtividade).subscribe(() => {
      this.situacaoAtividadeService.showMessage('Situação da atividade atualizada com sucesso');
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
