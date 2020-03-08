import { Injectable, NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    private loadingBarService: LoadingBarService,
    public matDialog: MatDialog,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let dupReq;

    dupReq = req.clone({
      headers: req.headers
      .set('Content-Type', 'application/json')
    });

    if ("token" in localStorage) {
      dupReq = req.clone({
        headers: req.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+localStorage.getItem('token'))
      });

      if (req.url.includes('/strategy')) {
        dupReq = req.clone({
          headers: req.headers
          .set('Content-Type', 'application/octet-stream')
          .set('Authorization', 'Bearer '+localStorage.getItem('token'))
        });
      }
    }

    return next.handle(dupReq).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status === 200) {
        }
      }

      return event;
    })).pipe(catchError((response: HttpErrorResponse) => {
      if (response instanceof HttpErrorResponse) {
        this.matDialog.closeAll();

        this.loadingBarService.stop();

        if (response.status === 0) {
          Swal.fire({
            text: 'There was an error connecting to the server, please check your internet connection.',
            heightAuto: false
          });
        }

        if (response.status === 400) {
          Swal.fire({
            text: `${response.error.message}`,
            heightAuto: false
          });
        }

        if (response.status === 401) {
          Swal.fire({
            text: 'Your access has expired or you don\'t have permission.',
            heightAuto: false
          }).then(() => {
            localStorage.clear();

            this.router.navigate(['/login']);
          });
        }

        if (response.status === 403) {
          Swal.fire({
            text: 'You don\'t have access to this endpoint.',
            heightAuto: false
          });
        }

        if (response.status === 404) {
          Swal.fire({
            text: 'The requested endpoint does not exist.',
            heightAuto: false
          });
        }

        if (response.status === 422) {
          let innerHtml = "";

          for (let i = 0; i < response.error['data'].length; i++) {
            innerHtml += `<h6>${response.error['data'][i].property}</h6>`;

            for (let ii = 0; ii < response.error['data'][i].status.length; ii++) {
              innerHtml += `<p>${response.error['data'][i].status[ii]}</p>`;
            }
          }

          Swal.fire({
            html: innerHtml,
            showConfirmButton: false,
            customClass: 'error-form',
            heightAuto: false
          });
        }

        if (response.status === 423) {
          Swal.fire({
            html: response.message,
            heightAuto: false
          });
        }

        if (response.status === 500) {
          Swal.fire({
            text: 'Internal server error, please contact support.',
            heightAuto: false
          });
        }
      }

      return throwError(response);
    }));
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})

export class Interceptor {}
