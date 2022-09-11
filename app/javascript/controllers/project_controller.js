import { Controller } from "stimulus";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["datepicker"];

  initialize() {
    this.datePicker = null;
    this.dateList = [];
  }

  connect() {
    this.datePicker = flatpickr(this.datepickerTargets, {
      enableTime: false,
      dateFormat: "Y-m-d"
    });
  }

  selectStartDate() {
    const start_time = this.datePicker.selectedDates;
    this.dateList.push(start_time);
  }

  selectEndDate() {
    const end_time = this.datePicker.selectedDates;
    if (end_time !== undefined) {
      this.dateList.push(end_time);
    }
  }
}
