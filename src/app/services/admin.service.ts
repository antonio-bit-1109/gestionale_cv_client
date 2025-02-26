import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../utility/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // fare upload del cv tramite form data inviato al server.
  public uploadCv_admin(formData: FormData) {
    return this.http.post(
      `${environment.BASE_URL + environment.ADMIN_UPLOAD_CV}`,
      formData
    );
  }
}
