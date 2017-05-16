import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {LoadingController} from "ionic-angular";

/*
  Generated class for the LoadingServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoadingServiceProvider {

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingServiceProvider Provider');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 500
    });
    loader.present();
  }

}
