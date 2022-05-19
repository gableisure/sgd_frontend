import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/components/admin/admin.component';
import { AtividadeBacklogComponent } from './modules/atividade-backlog/components/atividade-backlog/atividade-backlog.component';
import { AtividadeEtapaEapComponent } from './modules/atividade-etapa-eap/components/atividade-etapa-eap/atividade-etapa-eap.component';
import { EtapaEapComponent } from './modules/etapa-eap/components/etapa-eap/etapa-eap.component';
import { MotivoBloqueioComponent } from './modules/motivo-bloqueio/components/motivo-bloqueio/motivo-bloqueio.component';
import { PerfilUsuarioComponent } from './modules/perfil-usuario/components/perfil-usuario/perfil-usuario.component';
import { PrioridadeAtividadeComponent } from './modules/prioridade-atividade/components/prioridade-atividade/prioridade-atividade.component';
import { SituacaoAtividadeComponent } from './modules/situacao-atividade/components/situacao-atividade/situacao-atividade.component';
import { SituacaoTarefaComponent } from './modules/situacao-tarefa/components/situacao-tarefa/situacao-tarefa.component';
import { SprintComponent } from './modules/sprint/components/sprint/sprint.component';
import { TarefaObservadorComponent } from './modules/tarefa-observador/components/tarefa-observador/tarefa-observador.component';
import { TarefaComponent } from './modules/tarefa/components/tarefa/tarefa.component';
import { TedDetailsComponent } from './modules/ted/components/ted-details/ted-details.component';
import { TedReadComponent } from './modules/ted/components/ted-read/ted-read.component';
import { UsuarioReadComponent } from './modules/usuario/components/usuario-read/usuario-read.component';

const routes: Routes = [
  {
    path: "teds",
    component: TedReadComponent
  },
  {
    path: "teds/teddetails/:id",
    component: TedDetailsComponent
  },
  {
    path: "motivobloqueio",
    component: MotivoBloqueioComponent
  },
  {
    path: "perfilusuario",
    component: PerfilUsuarioComponent
  },
  {
    path: "etapaeap",
    component: EtapaEapComponent
  },
  {
    path: "prioridadeatividade",
    component: PrioridadeAtividadeComponent
  },
  {
    path: "situacaoatividade",
    component: SituacaoAtividadeComponent
  },
  {
    path: "sprint",
    component: SprintComponent
  },
  {
    path: "atividadeetapaeap",
    component: AtividadeEtapaEapComponent
  },
  {
    path: "atividadebacklog",
    component: AtividadeBacklogComponent
  },
  {
    path: "situacaotarefa",
    component: SituacaoTarefaComponent
  },
  {
    path: "tarefaobservador",
    component: TarefaObservadorComponent
  },
  {
    path: "tarefa",
    component: TarefaComponent
  },
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "usuario",
    component: UsuarioReadComponent
  },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
