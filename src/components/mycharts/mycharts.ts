import {Component, ViewChild, Input} from '@angular/core';
import Chart from 'chart.js';
import {NavController, NavParams} from "ionic-angular";

/**
 * Generated class for the Mycharts component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'mycharts',
  templateUrl: 'mycharts.html'
})
export class Mycharts {
  @ViewChild('thecanvas') canvas;
  doughnutChart: any;
  @Input() hide: any = {};

  constructor() {
    console.log('Hello Mycharts Component');
    if (!this.hide)
      this.doughnutChart = this.getDoughnutChart();
  }

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
  }

  getDoughnutChart() {
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
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
      }]
    };
    // if (this.canvas!=null)
      return this.getChart(this.canvas.nativeElement, "doughnut", data);
    // else return null;
  }
}
