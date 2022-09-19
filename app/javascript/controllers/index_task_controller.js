import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["todoBtn", "doingBtn", "doneBtn"];

  showTodoList() {
    const event = new CustomEvent("showTodo");
    window.dispatchEvent(event);
  }

  showDoingList() {
    const event = new CustomEvent("showDoing");
    window.dispatchEvent(event);
  }

  showDoneList() {
    const event = new CustomEvent("showDone");
    window.dispatchEvent(event);
  }
}
