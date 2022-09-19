import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = [
    "project_list",
    "popup",
    "title",
    "content",
    "start",
    "end",
    "datepicker"
  ];

  initialize() {
    this.datePicker = null;
    this.paramsList = [];
  }

  connect() {
    this.selectDate();
  }

  selectDate() {
    this.datePicker = flatpickr(this.datepickerTargets, {
      enableTime: false,
      dateFormat: "Y-m-d"
    });
  }

  close() {
    this.popupTarget.style.display = "none";
  }

  open() {
    this.popupTarget.style.display = "block";
  }

  createProject() {
    const data = new FormData();
    data.append("project[title]", this.titleTarget.value);
    data.append("project[content]", this.contentTarget.value);
    data.append("project[start_time]", new Date(this.startTarget.value));
    data.append("project[end_time]", new Date(this.endTarget.value));

    Rails.ajax({
      url: `/projects`,
      type: "POST",
      data,
      success: () => {},
      errors: () => {}
    });
  }
}
