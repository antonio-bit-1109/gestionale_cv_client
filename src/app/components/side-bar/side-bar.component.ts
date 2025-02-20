import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() sidebarVisible: boolean = false;

  constructor(private router: Router) {}

  public goToGetAllCv() {
    this.router.navigateByUrl('home');
  }

  public goToCreaCv() {
    this.router.navigateByUrl('/home/crea-cv');
  }

  public goToricercaEsperienza() {
    this.router.navigateByUrl('/home/ricerca-esperienze');
  }
}
