import { Component } from '@angular/core';

import { NavController, MenuController } from 'ionic-angular';

@Component({
    selector: 'page-countdown',
    templateUrl: 'countdown.html'
})
export class CountdownOnePage {

    constructor(public navCtrl: NavController, public menu: MenuController) {
    }

}