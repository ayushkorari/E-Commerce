import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map,tap } from 'rxjs/operators';
import { SecurityService } from '../security.service'


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  security:SecurityService;
  constructor(security:SecurityService) {this.security = security}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem("token")

    const authReq = req.clone({ setHeaders: { Authorization: authToken }, responseType: 'text' });

    // send cloned request with header to the next handler.
    return next.handle(authReq)
    }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/