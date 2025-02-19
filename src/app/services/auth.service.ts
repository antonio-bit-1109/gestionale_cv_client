import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_PAYLOAD } from '../utility/modelResponse/modelResp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public saveInStorage(token: string) {
    if (token && token.length) {
      localStorage.setItem('token', token);
      return true;
    }

    return false;
  }

  public isUserLoggedIn() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public retriveTokenFromStorage() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      console.error('impossibile recuperare il token dalla local storage');
      return null;
    }
  }

  public getDecodedToken(token: string | null) {
    const decoded: TOKEN_PAYLOAD = jwtDecode(token ? token : '');
    return decoded;
  }

  public getRole(): string {
    const token = this.retriveTokenFromStorage();
    const decoded = this.getDecodedToken(token);
    return decoded.role;
  }

  public isAdmin(): boolean {
    const token = this.retriveTokenFromStorage();
    const decoded = this.getDecodedToken(token);
    return decoded.role === 'ADMIN';
  }

  public getName(): string {
    const token = this.retriveTokenFromStorage();
    const decoded = this.getDecodedToken(token);
    return decoded.sub;
  }
  public getIdUser(): string {
    const token = this.retriveTokenFromStorage();
    const decoded = this.getDecodedToken(token);
    return decoded.jti;
  }
}
