import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utility/environments/environment';
import { IEdit_Create_Cv } from '../utility/modelRequests/modelReq';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private http: HttpClient) {}

  public getAllUserCvs(id_utente: string) {
    return this.http.get(
      `${
        environment.BASE_URL + environment.URL_CV + environment.GET_ALL_CV_USER
      }/${id_utente}`
    );
  }

  public getDaticv(id_cvVal: string) {
    return this.http.get(
      `${
        environment.BASE_URL + environment.URL_CV + environment.GET_SINGOLO_CV
      }/${id_cvVal}`
    );
  }

  public editCv(cvData: IEdit_Create_Cv) {
    return this.http.post(
      `${environment.BASE_URL + environment.URL_CV + environment.EDIT_CV}`,
      {
        idUtente: cvData.idUtente,
        idCv: cvData.idCv,
        titolo: cvData.titolo,
        competenze: cvData.competenze,
        istruzione: cvData.istruzione,
        esperienzePrecedenti: cvData.esperienzePrecedenti,
        lingueConosciute: cvData.lingueConosciute,
        descrizioneGenerale: cvData.descrizioneGenerale,
      }
    );
  }

  public createCv(dataCv: IEdit_Create_Cv) {
    return this.http.post(
      `${environment.BASE_URL + environment.URL_CV + environment.CREATE_CV}`,
      {
        idUtente: dataCv.idUtente,
        titolo: dataCv.titolo,
        competenze: dataCv.competenze,
        istruzione: dataCv.istruzione,
        esperienzePrecedenti: dataCv.esperienzePrecedenti,
        lingueConosciute: dataCv.lingueConosciute,
        descrizioneGenerale: dataCv.descrizioneGenerale,
      }
    );
  }

  public deleteCv(id_utente: string, id_cv: number) {
    return this.http.post(
      `${environment.BASE_URL + environment.URL_CV + environment.DELETE_CV}`,
      {
        id_utente: Number(id_utente),
        id_cv: Number(id_cv),
      }
    );
  }

  public ricerca_Cv_esperienze(esperienze: string) {
    return this.http.get(
      `${
        environment.BASE_URL + environment.URL_CV
      }findByEsperienze?esperienze=${esperienze}`
    );
  }

  public ricerca_cv_competenze(competenze: string) {
    return this.http.get(
      `${
        environment.BASE_URL + environment.URL_CV
      }findByCompetenza?competenza=${competenze}`
    );
  }

  public ricerca_cv_nome_candidato(nomeUtente: string) {
    return this.http.get(
      `${
        environment.BASE_URL + environment.URL_CV
      }findByNome?nome=${nomeUtente}`
    );
  }

  public downloadFile(id_cv: number, nomeProprietario: string) {
    return this.http
      .get(
        `${
          environment.BASE_URL + environment.URL_CV
        }downloadPDF?id_cv=${id_cv}`,
        { responseType: 'blob' }
        //
      )
      .subscribe({
        //
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `cv_${nomeProprietario}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Errore durante il download del file', err);
        },
      });
  }
}
