import { Controller } from "stimulus";
import Gantt from "frappe-gantt";
import Rails from "@rails/ujs";
export default class extends Controller {
  static targets = ["task"];
  initialize() {
    this.ganttChart = null;
  }
  connect() {
    // console.log(this.element.dataset);
    this.projectId = this.element.dataset.projectId;
    Rails.ajax({
      url: `/projects/${this.projectId}/tasks`,
      type: "GET",
      success: ({ tasks }) => {
        // let { id, name, start, end, progress, dependencies } = tasks[0];
        let all_tasks = [];
        tasks.forEach((e) => {
          let { id, title, start_time, end_time } = e;
          all_tasks.push({
            id: id,
            name: title,
            start: start_time.split("T")[0],
            end: end_time.split("T")[0],
          });
        });
        this.ganttChart = new Gantt("#gantt", all_tasks, {
          header_height: 80,
          column_width: 60,
          step: 50,
          bar_height: 35,
          bar_corner_radius: 9,
          arrow_curve: 9,
          padding: 26,
        });

        console.log(all_tasks);
      },
      error: () => {
        Swal.fire({
          title: "Oops...",
          text: "Something went wrong!",
        });
      },
    });
  }
  day() {
    this.ganttChart.change_view_mode("Day");
  }
  week() {
    this.ganttChart.change_view_mode("Week");
  }
  month() {
    this.ganttChart.change_view_mode("Month");
  }
}

