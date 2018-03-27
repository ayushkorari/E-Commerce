import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable()
export class SecurityService {

  constructor() { }

  static key = '';
  encrypt(data:any)
  {
    return crypto.AES.encrypt(data, SecurityService.key).toString();
  }

  decrypt(data:any)
  {
   
   return crypto.AES.decrypt(data, SecurityService.key).toString(crypto.enc.Utf8);
  }
}
