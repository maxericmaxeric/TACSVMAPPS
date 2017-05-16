
import { Component, Input,ViewChild, ElementRef, Renderer } from '@angular/core';
import Chart from 'chart.js';
import {AssetdataServiceProvider} from "../../providers/assetdata-service/assetdata-service";
import {LoadingServiceProvider} from "../../providers/util/loading-service";
// import CanvasJS  from 'canvasjs.js';
/**
 * Generated class for the Sss component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'charts-custom',
  templateUrl: 'charts.html'
})
export class ChartsCustom {

  // @Input() chart: any;
  // @Input() customer_code: string;
  // @Input() currency: string;
  @Input() data: any[];
  @ViewChild('mycanvas') curCanvas;
  labels: string[] = [];
  datas: number[] = [];
  curr: string = "USD";
  constructor(public element: ElementRef, public assetService: AssetdataServiceProvider, public loaderService: LoadingServiceProvider) {

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit Overview');

    console.log(this.curCanvas);
    setTimeout(()=>{
      // this.getBarChart();
      // this.getDoughnutPieChart();

      // this.loaderService.presentLoading();
      // this.getChartData();
      // this.getCanvasJsDoughnut();

      for (let dt of this.data) {
        this.labels.push(dt.type);
        this.datas.push(dt.balance_sum);
      }
      this.getDoughnutPieChart(this.labels, this.datas);
    },0)
  }

  formatNumber(num: number): number {
    if (isNaN(num)) {
      throw new TypeError("num is not a number");
    }
    let numstr: string = ("" + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    let ret: number = Number(numstr);
    console.log(ret);
    return ret;
  }

  // getChartData(): void {
  //   this.getAccType(this.customer_code, this.currency);
  // }

 /* private getAccType(customer_code: string, currency: string) {
    this.assetService.getAccType(this.customer_code, currency).then(data => {
      let aaa:string[] = [];
      let bbb: number[] = [];
      // let total: number = 0;

      /!*!//计算总金额
       for(let type of this.chart){
       total = total + type.balance;
       }
       console.log(total);*!/

      for(let type of data){
        aaa.push(type.account_type);
        /!*!//显示百分比
         if (total !== 0) {
         let percent = Math.round(type.balance / total * 100);
         bbb.push(percent);
         }
         else { bbb.push(0);}*!/
        bbb.push(type.balance_sum);
        console.log(type.account_type + " " + type.balance_sum);
      }
      console.log(data.length);
      console.log(JSON.stringify(data));

      this.getDoughnutPieChart(aaa,bbb);
    });

  }*/

  /*getCanvasJsDoughnut() {
    var chart = new CanvasJS.Chart("curCanvas",
      {
        title:{
          text: "US Mobile / Tablet OS Market Share, Dec 2012"
        },
        animationEnabled: true,
        theme: "theme2",
        data: [
          {
            type: "doughnut",
            indexLabelFontFamily: "Garamond",
            indexLabelFontSize: 20,
            startAngle:0,
            indexLabelFontColor: "dimgrey",
            indexLabelLineColor: "darkgrey",
            toolTipContent: "{y} %",

            dataPoints: [
              {  y: 67.34, indexLabel: "iOS {y}%" },
              {  y: 28.6, indexLabel: "Android {y}%" },
              {  y: 1.78, indexLabel: "Kindle {y}%" },
              {  y: 0.84,  indexLabel: "Symbian {y}%"},
              {  y: 0.74, indexLabel: "BlackBerry {y}%" },
              {  y: 2.06,  indexLabel: "Others {y}%"}

            ]
          }
        ]
      });

    chart.render();
  }*/


  getBarChart() {


    let data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    let options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    new Chart( this.curCanvas.nativeElement, {
      type: "bar",
      data: data,
      options: options
    });
  }

  getDoughnutPieChart(aaa: string[], bbb: number[]) {

    let data = {
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      labels: aaa,
      datasets: [{
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2, 3],
        data: bbb,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
      }]
    };

    // let options = {
    //   circumference: Math.PI,
    //   rotation: 1.0 * Math.PI
    // };

    // let options={};

    new Chart( this.curCanvas.nativeElement, {
      type: "doughnut",
      data: data,
      options: null
    });
  }
}
