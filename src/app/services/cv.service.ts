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

  public getDaticv(id_cvVal: string, id_utenteVal: string) {
    return this.http.post(
      `${
        environment.BASE_URL + environment.URL_CV + environment.GET_SINGOLO_CV
      }`,
      { id_utente: id_utenteVal, id_cv: id_cvVal }
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
      }
    );
  }
}
