import { Controller } from 'stimulus';
import picker from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Rails from '@rails/ujs';
import Swal from 'sweetalert2';

export default class extends Controller {
  static targets = ["title", "content", "start", "end", "datepicker"];

  initialize() {
    this.datePicker = null;
  }

  connect() {
    this.selectDate();
  }

  selectDate() {
    this.datePicker = picker(this.datepickerTargets, {
      enableTime: false,
      dateFormat: "Y-m-d"
    });
  }
  project_update() {
    const data = new FormData();
    data.append("project[start_time]", new Date(this.startTarget.value));
    data.append("project[end_time]", new Date(this.endTarget.value));

    Rails.ajax({
      url: `/project`,
      type: "PATCH",
      data,
      success: () => {
        console.log("in");
      },
      errors: () => {}
    });
  }
}
