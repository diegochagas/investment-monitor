import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public headerText = new BehaviorSubject<string>('Defaut Value');
  public numberRecords = new BehaviorSubject<string>('0');
  public buttonObj = new BehaviorSubject<object>({});

  headerTextObservable = this.headerText.asObservable();
  numberRecordsObservable = this.numberRecords.asObservable();
  buttonObjObservable = this.buttonObj.asObservable();

  headerTextChangeValue(value: string): void {
    this.headerText.next(value);
  }

  numberRecordsChangeValue(value: string): void {
    this.numberRecords.next(value);
  }

  buttonObjChangeValue(value: object): void {
    this.buttonObj.next(value);
  }

}
