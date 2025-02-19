import { Component } from '@angular/core';
import { Icv, IRespListaCV } from '../../utility/modelResponse/modelResp';
import { CvService } from '../../services/cv.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-cv-user',
  standalone: false,
  templateUrl: './get-all-cv-user.component.html',
  styleUrl: './get-all-cv-user.component.scss',
})
export class GetAllCvUserComponent {
  public AllCvList: IRespListaCV | undefined;

  constructor(
    private cvService: CvService,
    private authService: AuthService,
    private router: Router
  ) {}

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

  public scaricaPdf(cv: Icv) {}

  public goToModificaCv(id_cv: number) {
    this.router.navigateByUrl(`/home/modifica-cv/${id_cv}`);
  }
}
