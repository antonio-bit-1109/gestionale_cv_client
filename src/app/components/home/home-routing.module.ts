import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageComponent } from '../../home-page/home-page.component';
import { loginGuard } from '../../guards/login.guard';
import { GetAllCvUserComponent } from '../get-all-cv-user/get-all-cv-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: GetAllCvUserComponent, canActivate: [loginGuard] },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
