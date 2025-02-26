import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() sidebarVisible: boolean = false;

  constructor(private router: Router, public authService: AuthService) {}

  public goToGetAllCv() {
    this.router.navigateByUrl('home');
  }

  public goToCreaCv() {
    this.router.navigateByUrl('/home/crea-cv');
  }

  public goToricercaEsperienza() {
    this.router.navigateByUrl('/home/ricerca-esperienze');
  }

  public gotoRicercaCompetenza() {
    this.router.navigateByUrl('/home/ricerca-competenza');
  }

  public gotoRicercaCv_NomeCandidato() {
    this.router.navigateByUrl('/home/ricerca-nome-candidato');
  }

  public goToCaricaCvAdmin() {
    this.router.navigateByUrl('/home/carica-cv-admin');
  }
}
