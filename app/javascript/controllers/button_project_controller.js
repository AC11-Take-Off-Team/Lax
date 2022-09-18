import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  initialize() {
    this.datePicker = null;
    this.paramsList = [];
  }

  connect() {}

  openProjectPopup() {
    const event = new CustomEvent("open");
    window.dispatchEvent(event);
  }
}
