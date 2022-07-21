import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './core/header/header.component';
import { TitlePageComponent } from './core/title-page/title-page.component';
import { HomeComponent } from './core/home/home.component';
import { AdminComponent } from './modules/admin/components/admin/admin.component';
import { TedComponent } from './modules/ted/components/ted/ted.component';
import { TedReadComponent } from './modules/ted/components/ted-read/ted-read.component';
import { TedCreateDialogComponent } from './modules/ted/components/ted-create-dialog/ted-create-dialog.component';
import { TedUpdateDialogComponent } from './modules/ted/components/ted-update-dialog/ted-update-dialog.component';
import { UsuarioReadComponent } from './modules/usuario/components/usuario-read/usuario-read.component';
import { UsuarioCreateDialogComponent } from './modules/usuario/components/usuario-create-dialog/usuario-create-dialog.component';
import { TarefaDetailsDialogComponent } from './modules/tarefa/components/tarefa-details-dialog/tarefa-details-dialog.component';
import { MotivoBloqueioComponent } from './modules/motivo-bloqueio/components/motivo-bloqueio/motivo-bloqueio.component';
import { MotivoBloqueioCreateDialogComponent } from './modules/motivo-bloqueio/components/motivo-bloqueio-create-dialog/motivo-bloqueio-create-dialog.component';
import { MotivoBloqueioUpdateDialogComponent } from './modules/motivo-bloqueio/components/motivo-bloqueio-update-dialog/motivo-bloqueio-update-dialog.component';
import { PerfilUsuarioComponent } from './modules/perfil-usuario/components/perfil-usuario/perfil-usuario.component';
import { EtapaEapComponent } from './modules/etapa-eap/components/etapa-eap/etapa-eap.component';
import { PrioridadeAtividadeComponent } from './modules/prioridade-atividade/components/prioridade-atividade/prioridade-atividade.component';
import { SituacaoAtividadeComponent } from './modules/situacao-atividade/components/situacao-atividade/situacao-atividade.component';
import { SprintComponent } from './modules/sprint/components/sprint/sprint.component';
import { AtividadeEtapaEapComponent } from './modules/atividade-etapa-eap/components/atividade-etapa-eap/atividade-etapa-eap.component';
import { AtividadeBacklogComponent } from './modules/atividade-backlog/components/atividade-backlog/atividade-backlog.component';
import { SituacaoTarefaComponent } from './modules/situacao-tarefa/components/situacao-tarefa/situacao-tarefa.component';
import { TarefaObservadorComponent } from './modules/tarefa-observador/components/tarefa-observador/tarefa-observador.component';
import { TarefaComponent } from './modules/tarefa/components/tarefa/tarefa.component';
import { PerfilUsuarioUpdateDialogComponent } from './modules/perfil-usuario/components/perfil-usuario-update-dialog/perfil-usuario-update-dialog.component';
import { PerfilUsuarioCreateDialogComponent } from './modules/perfil-usuario/components/perfil-usuario-create-dialog/perfil-usuario-create-dialog.component';
import { EtapaEapUpdateDialogComponent } from './modules/etapa-eap/components/etapa-eap-update-dialog/etapa-eap-update-dialog.component';
import { EtapaEapCreateDialogComponent } from './modules/etapa-eap/components/etapa-eap-create-dialog/etapa-eap-create-dialog.component';
import { SituacaoAtividadeCreateDialogComponent } from './modules/situacao-atividade/components/situacao-atividade-create-dialog/situacao-atividade-create-dialog.component';
import { SituacaoAtividadeUpdateDialogComponent } from './modules/situacao-atividade/components/situacao-atividade-update-dialog/situacao-atividade-update-dialog.component';
import { SituacaoTarefaCreateDialogComponent } from './modules/situacao-tarefa/components/situacao-tarefa-create-dialog/situacao-tarefa-create-dialog.component';
import { SituacaoTarefaUpdateDialogComponent } from './modules/situacao-tarefa/components/situacao-tarefa-update-dialog/situacao-tarefa-update-dialog.component';
import { PrioridadeAtividadeUpdateDialogComponent } from './modules/prioridade-atividade/components/prioridade-atividade-update-dialog/prioridade-atividade-update-dialog.component';
import { PrioridadeAtividadeCreateDialogComponent } from './modules/prioridade-atividade/components/prioridade-atividade-create-dialog/prioridade-atividade-create-dialog.component';
import { AtividadeBacklogCreateDialogComponent } from './modules/atividade-backlog/components/atividade-backlog-create-dialog/atividade-backlog-create-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';

import { ErrorBuildPageComponent } from './core/error-build/components/error-build-page/error-build-page.component';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { TedDetalheComponent } from './shared/components/ted-detalhe/ted-detalhe.component';
import { AtividadeBacklogDetalheComponent } from './shared/components/atividade-backlog-detalhe/atividade-backlog-detalhe.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TedComponent,
    TedReadComponent,
    TedCreateDialogComponent,
    TedUpdateDialogComponent,
    TitlePageComponent,
    UsuarioReadComponent,
    UsuarioCreateDialogComponent,
    TarefaDetailsDialogComponent,
    MotivoBloqueioComponent,
    PerfilUsuarioComponent,
    EtapaEapComponent,
    PrioridadeAtividadeComponent,
    SituacaoAtividadeComponent,
    SprintComponent,
    AtividadeEtapaEapComponent,
    AtividadeBacklogComponent,
    SituacaoTarefaComponent,
    TarefaObservadorComponent,
    TarefaComponent,
    PerfilUsuarioUpdateDialogComponent,
    PerfilUsuarioCreateDialogComponent,
    AdminComponent,
    MotivoBloqueioCreateDialogComponent,
    MotivoBloqueioUpdateDialogComponent,
    EtapaEapUpdateDialogComponent,
    EtapaEapCreateDialogComponent,
    SituacaoAtividadeCreateDialogComponent,
    SituacaoAtividadeUpdateDialogComponent,
    SituacaoTarefaCreateDialogComponent,
    SituacaoTarefaUpdateDialogComponent,
    PrioridadeAtividadeUpdateDialogComponent,
    PrioridadeAtividadeCreateDialogComponent,
    HomeComponent,
    ErrorBuildPageComponent,
    BreadcrumbComponent,
    TedDetalheComponent,
    AtividadeBacklogCreateDialogComponent,
    AtividadeBacklogDetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxMaskModule.forRoot(),
    MatSlideToggleModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
