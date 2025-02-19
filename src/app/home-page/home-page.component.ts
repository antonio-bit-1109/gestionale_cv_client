import { Component } from '@angular/core';
import { CvService } from '../services/cv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(private cvService: CvService, private authService: AuthService) {
    if (this.authService.isUserLoggedIn() !== null) {
      //

      const id_utente = this.authService.getIdUser();
      console.log(id_utente);
      this.cvService.getAllUserCvs(id_utente).subscribe({
        next: (res) => {},
        error: (err: HttpErrorResponse) => {},
      });

      //
    }
  }
}
