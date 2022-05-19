import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  matListOptions = [
    { "view_label": "Perfil usuário", "routerLink": "/perfilusuario" },
    { "view_label": "Motivo bloqueio", "routerLink": "/motivobloqueio" },
    { "view_label": "Etapa EAP", "routerLink": "/etapaeap" },
    { "view_label": "Usuário", "routerLink": "/usuario" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
