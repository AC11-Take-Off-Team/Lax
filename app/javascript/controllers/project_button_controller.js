import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  showListSample() {
    const event = new CustomEvent("showListSample");
    window.dispatchEvent(event);
  }

  showBoardSample() {
    const event = new CustomEvent("showBoardSample");
    window.dispatchEvent(event);
  }

  showTimelineSample() {
    const event = new CustomEvent("showTimelineSample");
    window.dispatchEvent(event);
  }

  showCalendarSample() {
    const event = new CustomEvent("showCalendarSample");
    window.dispatchEvent(event);
  }
}
