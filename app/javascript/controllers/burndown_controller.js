import { Controller } from "stimulus";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { getRelativePosition } from 'chart.js/helpers';
import Rails from "@rails/ujs";


export default class extends Controller {
  static targets = ["chart"]

  initialize() {
    this.chartArea = this.chartTarget.getContext('2d')
  }

  connect() {
    this.createChart()
    console.log(this.chartArea);
  }

  createChart() {
    new Chart(this.chartArea, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4'],
        datasets: [{
          label: '',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }]
      }
    })
  }
}


