import { Controller } from "stimulus";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { getRelativePosition } from "chart.js/helpers";
import Rails from "@rails/ujs";
import Decimal from 'decimal.js';

export default class extends Controller {
  static targets = ["chart"];

  initialize() {
    this.projectId = 0;
    this.chartArea = this.chartTarget.getContext("2d");
    this.taskCount = 0;
    this.taskList = [];
    this.taskDoneCount = 0;
    this.taskUnfinishedList = [];
    this.dayList = [];
    this.duration = null;
    this.projectStart = null;
    this.projectEnd = null;
  }

  connect() {
    this.projectId = this.element.dataset.projectId;
    this.taskCount = this.element.dataset.taskCount;
    this.taskDoneCount = this.element.dataset.taskDoneCount;
    this.projectStart = this.element.dataset.projectStart;
    this.projectEnd = this.element.dataset.projectEnd;
    // this.task
    console.log(this.projectStart);

    this.dayNum();
    this.taskNum();
    this.taskUnfinishedNum();
    this.createChart();
  }

  dayNum() {
    const start = Date.parse(this.projectStart);
    const end = Date.parse(this.projectEnd);
    const today = Date.parse(new Date().toISOString());

    const schedule = Math.ceil((end - start) / 86400000);
    this.duration = Math.ceil((today - start) / 86400000);

    if (schedule > 0) {
      for (let i = 1; schedule >= i; i += 1) {
        this.dayList.push(`Day${i}`);
      }
    } else {
      this.dayList = ["Day0"];
    }
  }

  taskNum() {
    if (this.taskCount > 0) {
      let taskNum = this.taskCount;
      let totalDay = this.dayList.length
      let avg = taskNum / (totalDay - 1) 
      console.log(totalDay);
      
      for (let i = 0; i < totalDay; i += 1) {
        if (taskNum < 0 ){
          taskNum = [0]
        }
        this.taskList.push(taskNum);
        taskNum = taskNum - avg;
      }
      
    } else {
      this.taskList = [0];
    }
  }

  taskUnfinishedNum() {
    this.taskUnfinishedList = [this.taskCount]
    if ((this.duration - 1)> 0) {
      for (let i = 1; this.duration > i; i += 1) {
        this.taskUnfinishedList.push(this.taskCount - this.taskDoneCount);
      }
      console.log(this.taskUnfinishedList);
    } else {
      this.taskUnfinishedList = this.taskList;
    }
  }

  createChart() {
    new Chart(this.chartArea, {
      type: "line",
      data: {
        labels: this.dayList,
        datasets: [
          {
            type: "line",
            label: "預期進度",
            data: this.taskList,
            fill: true,
            borderColor: "rgb(54, 162, 235)"
          },
          {
            type: "line",
            label: "實際進度",
            data: this.taskUnfinishedList,
            fill: true,
            borderColor: "rgb(241, 101, 138)"
          }
        ]
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    });
  }
}
