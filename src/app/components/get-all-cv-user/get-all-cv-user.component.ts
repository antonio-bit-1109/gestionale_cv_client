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
  public mostraModale = false;
  public titoloCvSelected;
  public dataCreazioneCvSelected;
  public id_cv_selected: number | undefined;
  public id_utente: string | undefined;
  constructor(
    private cvService: CvService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn() !== null) {
      this.id_utente = this.authService.getIdUser();
      //
      // this.id_utente = idUtente
      this.getAllUserCV(this.id_utente);
    }
  }

  public getAllUserCV(id_utente: string) {
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
  }

  public scaricaPdf(cv: Icv) {}

  public goToModificaCv(id_cv: number) {
    this.router.navigateByUrl(`/home/modifica-cv/${id_cv}`);
  }

  public showModal(cv: Icv) {
    this.mostraModale = true;
    this.dataCreazioneCvSelected = cv.created_at;
    this.titoloCvSelected = cv.titolo;
    this.id_cv_selected = cv.id_cv;
  }

  public prendiValoreNascondi(event) {
    this.mostraModale = event;
  }

  public getNotificaCancellazione(event: boolean) {
    if (event) {
      this.getAllUserCV(this.id_utente);
    }
  }
}
