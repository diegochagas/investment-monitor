import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  public profiles = new BehaviorSubject<[]>([]);

  profilesObservable = this.profiles.asObservable();

  profilesChangeValue(value: []): void {
    this.profiles.next(value);
  }

}
