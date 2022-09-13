import { Controller } from "stimulus";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { getRelativePosition } from "chart.js/helpers";
import Rails from "@rails/ujs";

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

    this.taskNum();
    this.dayNum();
    this.taskUnfinishedNum();
    this.createChart();
  }

  taskNum() {
    if (this.taskCount > 0) {
      let taskNum = this.taskCount;
      for (let i = 0; i < this.taskCount; i += 1) {
        this.taskList.push(taskNum);
        taskNum = taskNum - 1;
      }
    } else {
      this.taskList = [0];
    }
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

  taskUnfinishedNum() {
    if (this.duration > 0) {
      for (let i = 0; this.duration > i; i += 1) {
        this.taskUnfinishedList.push(this.taskCount - this.taskDoneCount);
      }
    } else {
      this.taskUnfinishedList = this.taskList;
    }
  }

  createChart() {
    new Chart(this.chartArea, {
      type: "scatter",
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
