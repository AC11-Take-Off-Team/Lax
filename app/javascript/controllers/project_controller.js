import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class extends Controller {
  static targets = ["title", "content", "start", "end", "datepicker"];

  initialize() {
    this.datePicker = null;
    this.projectTitle = "";
    this.projectContent = "";
    this.projectStart = "";
    this.projectEnd = "";
  }

  connect() {
    this.selectDate();
    if (this.element.dataset.error) {
      console.log(this.element.dataset.errorTitle);

      this.titleTarget.value = this.element.dataset.errorTitle;
      this.contentTarget.value = this.element.dataset.errorContent;
      this.startTarget.value = this.element.dataset.errorStart;
      this.endTarget.value = this.element.dataset.errorEnd;
    }
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
      success: () => {
        console.log(this.projectTitle);
      },
      errors: () => {}
    });
  }
}
