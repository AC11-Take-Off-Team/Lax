import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class extends Controller {
  static targets = ["title", "content", "start", "end", "datepicker"];

  initialize() {
    this.datePicker = null;
  }

  connect() {
    this.selectDate();
    this.projectId = this.element.dataset.projectId;
    this.titleTarget.value = this.element.dataset.editTitle;
    this.contentTarget.value = this.element.dataset.editContent;
    this.startTarget.value = this.element.dataset.editStart.slice(0, 10);
    this.endTarget.value = this.element.dataset.editEnd.slice(0, 10);
  }

  selectDate() {
    this.datePicker = flatpickr(this.datepickerTargets, {
      enableTime: false,
      dateFormat: "Y-m-d"
    });
  }

  updateProject(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("project[title]", this.titleTarget.value);
    data.append("project[content]", this.contentTarget.value);
    data.append("project[start_time]", new Date(this.startTarget.value));
    data.append("project[end_time]", new Date(this.endTarget.value));

    Rails.ajax({
      url: `/projects/${this.projectId}`,
      type: "PUT",
      data,
      success: () => {},
      errors: () => {}
    });
  }
}
