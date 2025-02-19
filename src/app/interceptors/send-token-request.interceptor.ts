import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class tokenRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const token: TOKEN_STORAGE = JSON.parse(localStorage.getItem('token'));

    const token = localStorage.getItem('token');

    if (token) {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
