import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ted } from '../../ted.module';
import { TedService } from '../../ted.service';
import { TedCreateDialogComponent } from '../ted-create-dialog/ted-create-dialog.component';
import { TedUpdateDialogComponent } from '../ted-update-dialog/ted-update-dialog.component';

@Component({
  selector: 'app-ted',
  templateUrl: './ted.component.html',
  styleUrls: ['./ted.component.css']
})
export class TedComponent implements OnInit {

  titlePage = 'TEDs';
  displayedColumns = ['sg_ted', 'ds_ted', 'dt_inicio', 'dt_fim', 'status', 'actions'];
  ted: Ted[] = [];
  checkedInactive = false;

  constructor(private tedService: TedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tedService.read().subscribe(ted => {
      this.ted = ted;
      this.ted.forEach((ted) => {
        ted.status = ted.dt_fim == undefined ? true : false;
        if (ted.dt_fim != null) ted.dt_fim = this.tedService.formatDateToISODate(ted.dt_fim);
        ted.dt_inicio = this.tedService.formatDateToISODate(ted.dt_inicio);
      });
      this.ted = this.ted.filter((ted) => ted.status == true);
      this.ted.sort((a, b) => (a.ds_ted < b.ds_ted) ? -1 : 1);
    });
  }

  openDialogUpdate(id: number): void {
    const dialogRef = this.dialog.open(TedUpdateDialogComponent, {
      height: '350px',
      width: '500px',
    });
    dialogRef.componentInstance.id_ted = String(id);
  }

  openDialogCreate(): void {
    this.dialog.open(TedCreateDialogComponent, {
      height: '350px',
      width: '500px',
    });
  }

  toggleStatus = (ted: Ted) => this.updateTed(ted);

  toggleShowInactive() { 
    if(this.checkedInactive) {
      this.tedService.read().subscribe(ted => this.ted = ted);
      this.tedService.read().subscribe((ted) => {
        this.ted = ted;
        this.ted.forEach((ted) => {
          ted.status = ted.dt_fim == undefined ? true : false;
          if (ted.dt_fim != null) ted.dt_fim = this.tedService.formatDateToISODate(ted.dt_fim);
          ted.dt_inicio = this.tedService.formatDateToISODate(ted.dt_inicio);
        });
      });
    }else{
      this.tedService.read().subscribe((ted) => {
        this.ted = ted;
        this.ted.forEach((ted) => {
          ted.status = ted.dt_fim == undefined ? true : false;
          if (ted.dt_fim != null) ted.dt_fim = this.tedService.formatDateToISODate(ted.dt_fim);
          ted.dt_inicio = this.tedService.formatDateToISODate(ted.dt_inicio);
        });
        this.ted = this.ted.filter((ted) => ted.status == true);
      });
    }
   }

   private updateTed = (ted: Ted): void => {
    const dt_fim = new Date;

    if(ted.dt_fim) {
      ted.dt_fim = null;
    }else{
      ted.dt_fim = dt_fim.toISOString();
    }
    ted.dt_inicio = this.tedService.formatDateToISODate(ted.dt_inicio);
    this.tedService.update(ted).subscribe(() => {
      this.tedService.showMessage('TED atualizada com sucesso');
    });
  }

}
