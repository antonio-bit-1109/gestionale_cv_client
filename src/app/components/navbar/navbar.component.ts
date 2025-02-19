import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() public emitVal = new EventEmitter();

  public nomeUtente: string | undefined;
  public ruolo: string | undefined;
  constructor(private authService: AuthService, private router: Router) {
    this.nomeUtente = this.authService.getName();
    this.ruolo = this.authService.getRole();
  }

  public emitBoolean() {
    this.emitVal.emit((prev: boolean) => !prev);
  }

  public doLogout() {
    this.authService.logout();
  }

  public goHome() {
    this.router.navigateByUrl('home');
  }
}
