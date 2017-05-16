import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import Chart from 'chart.js';
import { AssetdataServiceProvider, AccountType} from "../../providers/assetdata-service/assetdata-service";
import {LoadingServiceProvider} from "../../providers/util/loading-service";
import {OverviewServiceProvider, Overview, Liability, Asset} from "../../providers/overview-service/overview-service";
/**
 * Generated class for the Overview page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  assets: any = [{value:"$ 10,254",show: false,types:[
    {name:"SA (C)", balance:42476644787.07},
    {name:"Term Deposit (C)", balance:257780429000},
    {name:"7 Days Call", balance:240060000000}
    ]},
    {value: "￥ 3,456",show: false,types:[
      {name:"SA (C)", balance:42476644787.07},
      {name:"Term Deposit (C)", balance:257780429000},
      {name:"7 Days Call", balance:240060000000}
    ]},
    {value: "€ 78,000",show: false,types:[
      {name:"SA (C)", balance:42476644787.07},
      {name:"Term Deposit (C)", balance:257780429000},
      {name:"7 Days Call", balance:240060000000}
    ]}];


  liabilities: any = [{value:"$ 10,254",show: false},{value: "￥ 3,456",show: false},{value: "€ 78,000",show: false}];

  test: Asset[] = [];
  show: boolean[] = [];

  // acctype: AccountType[] = [];
  customer_code: string = "100100000060";

  overview: Overview;
  asset: Asset[] = [];
  asset_show: boolean[] =[];
  liability: Liability[] = [];
  liabiltiy_show: boolean[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public assetService: AssetdataServiceProvider, public overviewService: OverviewServiceProvider, public loaderService: LoadingServiceProvider) {
    // this.getAssets();
    this.getOverview();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Overview');
  }

  getCurrencySymbol(currency: string) {
    switch (currency)
    {
      case "MOP": return "MOP $";
      case "RMB": return "￥";
      case "USD": return "$";
      case "HKD": return "HKD $";
    }
  }

  getOverview(): void {
    this.loaderService.presentLoading();
    this.overviewService.getOverview(this.customer_code).then(data => {
      this.overview = data;
      // console.log(JSON.stringify(this.overview));
      this.asset = this.overview.assets;
      console.log(this.asset);
      for (let a of this.asset) {
        this.asset_show.push(false);
      }
      console.log(this.asset_show);
      this.liability = this.overview.liabilities;
      console.log(this.liability);
      for (let a of this.liability) {
        this.liabiltiy_show.push(false);
      }
      console.log(this.liabiltiy_show);
    });
  }

  getAssets(): void {
    this.loaderService.presentLoading();
    this.assetService.getAssets(this.customer_code).then(aaa => {
      // this.test = aaa;
      let length = this.test.length;
      for (let i = 0; i < length; i++) {
        this.show.push(false);
      }
      console.log(this.test.length);
      console.log(JSON.stringify(this.test));
    });
  }

  ShowChart(i: number): void {
    this.getAccType(this.customer_code, this.test[i].currency);
  }

  private getAccType(customer_code: string, currency: string) {
    this.assetService.getAccType(this.customer_code, currency).then(aaa => {
      // this.acctype = aaa;
      // console.log(this.acctype.length);
      // console.log(JSON.stringify(this.acctype));
    });
  }


}
