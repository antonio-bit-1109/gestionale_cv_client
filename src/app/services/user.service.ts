import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utility/environments/environment';
import { IRegistrationReq } from '../utility/modelRequests/modelReq';
import { Observable } from 'rxjs';
import { IGetAllUsers } from '../utility/modelResponse/modelResp';

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

  public getAllUsers(): Observable<IGetAllUsers> {
    return this.http.get<IGetAllUsers>(
      `${
        environment.BASE_URL + environment.URL_USER + environment.GET_ALL_USERS
      }`
    );
  }

  public getProfileImage(userId: string) {
    return this.http.get(
      `${
        environment.BASE_URL +
        environment.URL_USER +
        environment.GET_USER_PROFILE_IMAGE
      }/${userId}`
    );
  }
}
