import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  standalone: false,
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
})
export class RegistrazioneComponent {
  constructor(private router: Router) {}
  public goToLogin() {
    this.router.navigateByUrl('login');
  }
}
