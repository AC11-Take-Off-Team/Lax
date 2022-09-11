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
    this.taskStart = null;
    this.taskEnd = null;
  }

  connect() {
    this.projectId = this.element.dataset.projectId;
    this.taskCount = this.element.dataset.taskCount;
    this.taskStart = this.element.dataset.taskStart;
    this.taskEnd = this.element.dataset.taskEnd;
    console.log(this.taskCount, this.taskStart);

    this.createChart();
    this.fetchProject();
    this.expandTask();
  }

  expandTask() {
    if (this.taskCount > 0) {
      for (let i = 0; i < this.taskCount; i += 1) {
        this.taskList.push(this.taskCount - 1);
      }
    } else {
      this.taskList = [0];
    }
  }

  fetchProject() {
    Rails.ajax({
      url: `/projects/${this.projectId}/tasks`,
      type: "GET",
      success: () => {},
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="/">Back to Home</a>'
        });
      }
    });
  }

  createChart() {
    new Chart(this.chartArea, {
      type: "scatter",
      data: {
        labels: ["Day1", "Day2", "Day3", "Day4"],
        datasets: [
          {
            type: "line",
            label: "實際進度",
            data: [0.9, 0.8],
            fill: true,
            borderColor: "rgb(241, 101, 138)"
          },
          {
            type: "line",
            label: "預期進度",
            data: [this.taskList],
            fill: true,
            borderColor: "rgb(54, 162, 235)"
          }
        ]
      }
    });
  }
}
