import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utility/environments/environment';
import { IRegistrationReq } from '../utility/modelRequests/modelReq';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public registerUser(formData: IRegistrationReq) {
    return this.http.post(
      `${environment.BASE_URL + environment.URL_USER + environment.REGISTER}`,
      {
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono,
        consensoTrattamentoDati: formData.consensoTrattamentoDati,
      }
    );
  }

  public DoLogin(emailVal: string, passwordVal: string) {
    return this.http.post(
      `${environment.BASE_URL + environment.URL_USER + environment.LOGIN}`,
      { email: emailVal, password: passwordVal }
    );
  }
}
