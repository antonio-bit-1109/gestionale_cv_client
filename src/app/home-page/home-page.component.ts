import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { IRespListaCV } from '../utility/modelResponse/modelResp';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public AllCvList: IRespListaCV | undefined;

  constructor(private cvService: CvService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn() !== null) {
      const id_utente = this.authService.getIdUser();
      console.log(id_utente);
      this.cvService.getAllUserCvs(id_utente).subscribe({
        next: (res: IRespListaCV) => {
          this.AllCvList = res;
          console.log(this.AllCvList);
        },

        error: (err: HttpErrorResponse) => {
          console.error(err.error);
        },
      });

      //
    }
  }
}
