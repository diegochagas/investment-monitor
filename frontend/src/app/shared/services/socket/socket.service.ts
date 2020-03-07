import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import * as io from 'socket.io-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  api = environment.socket + environment.projects.socketsIo;

  room = new BehaviorSubject<string>('');

  roomTextObservable = this.room.asObservable();

  private socket;

  private roomInstance;

  constructor() {
    this.socket = io(this.api, {
      query: {
        authentication: '30E0ECC4B7F193E8D56E34E65DAAD1626C2B8729C8FB495DB2C9BEE8304B8B3E'
      },
      transports: ['websocket']
    });
  }

  roomTextChangeValue(value: string): void {
    this.room.next(`${value}`);
  }

  initSocket() {
    this.room.subscribe((room) => {
      this.roomInstance = room;
    });

    this.socket.on('disconnect', (info: string) => {
      console.log(`Disconnected: ${info}`);

      if (info === 'transport close') {
        console.log('Communication with the queue has stopped, wait a few moments.');
      }
    });

    this.socket.on('connect', () => {
      console.log(`user connect in rooms: ${this.roomInstance}`);

      this.userInRooms();
    });

    this.socket.on('reconnect_attempt', () => {
      console.log('reconnect_attempt');
    });
  }

  userInRooms(): void {
    this.socket.emit('rooms', this.roomInstance);
  }

  connect(): void {
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  onMessage() {
    return Observable.create((observer) => {
      this.socket.on(this.roomInstance, (data) => {
        observer.next(data);
      });
    });
  }

  onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
