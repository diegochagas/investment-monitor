import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStrategyService {
  public positionTop = new BehaviorSubject<number>(0);

  positionTopObservable = this.positionTop.asObservable();

  positionTopChangeValue(value: number): void {
    this.positionTop.next(value);
  }
}
