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
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
