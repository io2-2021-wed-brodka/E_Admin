import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/internal/Observable'

import {SecurityService} from '../service/security.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private securityService: SecurityService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.securityService.token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Accept'       : 'application/json',
                    'Authorization': `Bearer ${this.securityService.token}`,
                },
            });
        }

        return next.handle(req);
    }
}