import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastController: ToastController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status == 0){
        this.presentToast("Error al conectar con el servidor");
        //this.toastService.error("Error al conectar con el servidor");
      }else{
        this.presentToast(err.error.error.message);
        //this.toastService.error(err.error.error.message);
      }
      return new Observable<HttpEvent<any>>();
    }))
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}