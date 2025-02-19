import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utility/environments/environment';

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
}
