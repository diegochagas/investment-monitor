import { Injectable } from '@angular/core';

import * as CryptDecrypt from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptDecryptService {
  key = "backOffice";

  constructor() { }

  encrypt(val) {
    return CryptDecrypt.AES.encrypt(val, this.key).toString();
  }

  decrypt(val) {
    return CryptDecrypt.AES.decrypt(val, this.key).toString(CryptDecrypt.enc.Utf8);
  }
}
