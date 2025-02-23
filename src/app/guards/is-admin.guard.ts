import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root',
})
export class isAdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private subjectService: SubjectService
  ) {}
  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    return this.youShallNotPass();
  }

  public youShallNotPass() {
    this.router.navigateByUrl('/home');
    return false;
  }
}
