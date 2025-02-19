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
}
