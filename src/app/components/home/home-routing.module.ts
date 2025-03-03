import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { loginGuard } from '../../guards/login.guard';
import { GetAllCvUserComponent } from '../get-all-cv-user/get-all-cv-user.component';
import { ModificaCvComponent } from '../modifica-cv/modifica-cv.component';
import { CreaCvComponent } from '../crea-cv/crea-cv.component';
import { RicercaCvEsperienzeComponent } from '../ricerca-cv-esperienze/ricerca-cv-esperienze.component';
import { RicercaCvCompetenzaComponent } from '../ricerca-cv-competenza/ricerca-cv-competenza.component';
import { VisualizzaCvComponent } from '../visualizza-cv/visualizza-cv.component';
import { CaricaCvAdminComponent } from '../carica-cv-admin/carica-cv-admin.component';
import { isAdminGuard } from '../../guards/is-admin.guard';
import { RicercaCvNomeCandidatoComponent } from '../ricerca-cv-nome-candidato/ricerca-cv-nome-candidato.component';
import { ProfiloUtenteComponent } from '../profilo-utente/profilo-utente.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: GetAllCvUserComponent, canActivate: [loginGuard] },
      { path: 'modifica-cv/:id_cv', component: ModificaCvComponent },
      { path: 'crea-cv', component: CreaCvComponent },
      { path: 'ricerca-esperienze', component: RicercaCvEsperienzeComponent },
      { path: 'ricerca-competenza', component: RicercaCvCompetenzaComponent },
      { path: 'profilo-utente', component: ProfiloUtenteComponent },
      {
        path: 'ricerca-nome-candidato',
        component: RicercaCvNomeCandidatoComponent,
      },
      { path: 'visualizza-cv/:id_cv', component: VisualizzaCvComponent },
      {
        path: 'carica-cv-admin',
        component: CaricaCvAdminComponent,
        canActivate: [isAdminGuard],
      },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
