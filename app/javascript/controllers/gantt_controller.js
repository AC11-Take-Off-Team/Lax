import { Controller } from "stimulus";
import Gantt from "frappe-gantt";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["task"];
  connect() {
    console.log(this.element.dataset);
    this.projectId = this.element.dataset.projectId;
    //http://127.0.0.1:3000/projects/15/tasks
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
