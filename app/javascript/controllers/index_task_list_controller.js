import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["undo", "doing", "done", "example"];

  initialize() {}

  connect() {}

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
