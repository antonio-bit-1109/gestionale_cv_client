import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private subjectService: SubjectService
  ) {}
  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }

    this.subjectService.setMessage(
      'errore durante il redirect alla home page. Hai effettuato il login?'
    );
    this.router.navigate(['login']);

    return false;
  }
}
