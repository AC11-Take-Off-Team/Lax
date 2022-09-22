import { Controller } from "stimulus";
import picker from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["datepicker", "task_display", "column_status", "card"];

  initialize() {
    this.datePicker = null;
  }
  connect() {
    this.datePicker = picker(this.datepickerTargets, {
      mode: "range"
    }); //使this.element變成月曆畫面
  }
  disconnect() {
    this.datePicker = null;
  }
  display_change() {
    const display = this.task_displayTarget;
    display.style.display == "block"
      ? (display.style.display = "none")
      : (display.style.display = "block");
  }
  selectdate() {
    const start_time = this.datePicker.selectedDates[0];
    const end_time = this.datePicker.selectedDates[1];
    const data = new FormData();
    data.append("start_time", start_time);
    if (end_time !== undefined) {
      data.append("end_time", end_time);
    }
  }
  taskPost() {
    const projectID = this.element.dataset.projectId;
    Rails.ajax({
      url: `/projects/${projectID}/tasks`,
      type: "post",
      success: () => {},
      error: (err) => {
        Swal.fire("日期指定失敗");
      }
    });
    this.task_displayTarget.style.display = "none";
  }
  closePost(event) {
    event.preventDefault();
    const cross = event.currentTarget.closest(".task_form");

    cross.style.display = "none";
    this.task_displayTarget.style.display = "none";
  }
}
