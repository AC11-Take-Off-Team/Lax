import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["createTask"];

  initialize() {}

  connect() {
    this.firstProjectId = this.element.dataset.projectId;
  }

  createTask() {
    if (event.key == "Enter") {
      console.log(this.createTaskTarget.value);

      const data = new FormData();
      data.append("task[title]", this.createTaskTarget.value);

      Rails.ajax({
        url: `projects/${this.firstProjectId}/tasks`,
        type: "POST",
        data,
        success: () => {
          this.createTaskTarget.value = "";
        },
        error: () => {}
      });
    }
  }

  showTodo() {
    this.undoTarget.style.display = "block";
    this.doingTarget.style.display = "none";
    this.doneTarget.style.display = "none";
    this.exampleTarget.style.display = "none";
  }
  showDoing() {
    this.doingTarget.style.display = "block";
    this.undoTarget.style.display = "none";
    this.doneTarget.style.display = "none";
    this.exampleTarget.style.display = "none";
  }
  showDone() {
    this.doneTarget.style.display = "block";
    this.doingTarget.style.display = "none";
    this.undoTarget.style.display = "none";
    this.exampleTarget.style.display = "none";
  }
}
