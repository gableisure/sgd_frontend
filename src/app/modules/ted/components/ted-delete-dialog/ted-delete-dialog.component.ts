import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Ted } from '../../ted.module';
import { TedService } from '../../ted.service';

@Component({
  selector: 'app-ted-delete-dialog',
  templateUrl: './ted-delete-dialog.component.html',
  styleUrls: ['./ted-delete-dialog.component.css']
})
export class TedDeleteDialogComponent implements OnInit {

  @Input() id_ted: string = ''
  
  ted: Ted = {
    ds_ted: ''
  }

  constructor(private tedService: TedService, public dialogRef: MatDialogRef<TedDeleteDialogComponent>) { }

  ngOnInit(): void {
    this.tedService.readById(this.id_ted).subscribe((ted) => {
      this.ted = ted;
    });
  }

  deleteTed = (): void => {
    this.tedService.delete(String(this.ted.id_ted)).subscribe(() => {
      this.tedService.showMessage('TED excluido com sucesso');
      this.dialogRef.close();
      window.location.reload();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
}
