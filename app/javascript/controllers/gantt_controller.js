import { Controller } from "stimulus";
import Gantt from "frappe-gantt";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["task"];
  connect() {
    console.log(this.element.dataset);
    this.projectId = this.element.dataset.projectId;
    Rails.ajax({
      url: `/projects/${this.projectId}/tasks`,
      type: "GET",
      success: ({ tasks }) => {
        console.log(tasks);
        // let { id, name, start, end, progress, dependencies } = tasks[0];
        tasks.forEach((e) => {
          let { id, title, start_time, end_time, progress, dependencies } = e;
          console.log(`id: ${id}`);
          console.log(`name: ${title}`);
          console.log(`start: ${start_time}`);
          console.log(`end: ${end_time}`);
          console.log(`progress: ${progress}`);
          console.log(`dependencies: ${dependencies}`);
          let new_gantt = {
            id,
            name: title,
            start: start_time,
            end: end_time,
            progress: 20,
            dependencies: "",
          };
          var gantt = new Gantt("#gantt", new_gantt);
          gantt.change_view_mode("Week");
        });
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="/">Back to Home</a>',
        });
      },
    });
    var tasks = [
      {
        id: "Task 1",
        name: "Redesign website",
        start: "2016-12-28",
        end: "2016-12-31",
        progress: 20,
        dependencies: "Task 2, Task 3",
      },
    ];
    var gantt = new Gantt("#gantt", tasks);
    gantt.change_view_mode("Week");
  }
}
const day = document.querySelector("#day-btn");
const week = document.querySelector("#week-btn");
const month = document.querySelector("#month-btn");

let AllModes = [day, week, month];

function changeViewMode(mode) {
  for (let modes of AllModes) {
    modes.classList.remove("active");
  }
  gantt.change_view_mode(mode);

  day.addEventListener("click", () => {
    changeViewMode("day-btn");
    QuarterDay.classList.add("active");
  });

  week.addEventListener("click", () => {
    changeViewMode("week-btn");
    QuarterDay.classList.add("active");
  });

  month.addEventListener("click", () => {
    changeViewMode("month-btn");
    QuarterDay.classList.add("active");
  });

  var gantt = new Gantt("#gantt", tasks, {
    on_click: function (tasks) {
      console.log(tasks);
    },
    on_date_change: function (tasks, start, end) {
      console.log(tasks, start, end);
    },
    on_progress_change: function (tasks, progress) {
      console.log(tasks, progress);
    },
    on_view_change: function (mode) {
      console.log(mode);
    },
    custom_popup_html: function (tasks) {
      const start_date = tasks.start_time.toLocaleDateString();
      const end_date = tasks.end_time.toLocaleDateString();
      return `
          <div class="details-container">
            <h5>${tasks.title}</h5>
            <p>Started on ${start_time}</p>
            <p>Expected to finish by ${end_time}</p>
            <p>${tasks.progress}% completed!</p>
            <p>Depended on ${tasks.dependencies}.</p>
          </div>`;
    },
  });
}
