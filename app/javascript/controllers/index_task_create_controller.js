import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["createTask"];

  connect() {
    this.firstProjectId = this.element.dataset.projectId;
  }

  createTask() {
    if (event.key == "Enter") {
      const data = new FormData();
      data.append("task[title]", this.createTaskTarget.value);

      const undo = document.getElementById("undo");
      let task = `<div class="flex pb-4 pl-2 mb-4 border-b border-gray-400">
      <img src="https://cdn-icons-png.flaticon.com/512/709/709510.png" class="h-4 mr-2 mt-auto mb-auto">
      <p>${this.createTaskTarget.value}</p>
      </div>`;

      Rails.ajax({
        url: `projects/${this.firstProjectId}/tasks`,
        type: "POST",
        data,
        success: () => {
          this.createTaskTarget.value = "";
          undo.insertAdjacentHTML("afterbegin", task);
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
