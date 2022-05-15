import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = false;

  constructor(private loadingController: LoadingController) { }

  async present(message: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: message
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}