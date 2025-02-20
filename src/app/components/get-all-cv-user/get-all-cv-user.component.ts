import { Component } from '@angular/core';
import {
  Icv,
  IRespListaCV,
  ValidationRespError,
} from '../../utility/modelResponse/modelResp';
import { CvService } from '../../services/cv.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { SubjectService } from '../../services/subject.service';

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
    private router: Router,
    private toastService: ToastService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn() !== null) {
      const id_utente = this.authService.getIdUser();
      console.log(id_utente);
      this.cvService.getAllUserCvs(id_utente).subscribe({
        next: (res: IRespListaCV) => {
          this.AllCvList = res;
          console.log(this.AllCvList);

          if (this.AllCvList.listaCV.length <= 0) {
            this.subjectService.InvitaCreazioneOn();
          } else {
            this.subjectService.InvitaCreazioneOff();
          }
        },

        error: (err: HttpErrorResponse) => {
          console.error(err.error);

          const errMsg = err.error as ValidationRespError;
          for (const key in errMsg) {
            if (errMsg.hasOwnProperty(key)) {
              const errorMessage = errMsg[key];

              if (!errorMessage) {
                continue;
              }

              this.toastService.show(
                'error',
                errorMessage,
                key.toString(),
                'toastGetAllCv',
                3500
              );
            }
          }
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
