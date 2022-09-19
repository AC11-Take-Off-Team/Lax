import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["list", "board", "timeline", "calendar"];

  showListSample() {
    this.listTarget.style.display = "block";
    this.boardTarget.style.display = "none";
    this.timelineTarget.style.display = "none";
    this.calendarTarget.style.display = "none";
    console.log(this.listTarget);
  }

  showBoardSample() {
    this.boardTarget.style.display = "block";
    this.listTarget.style.display = "none";
    this.timelineTarget.style.display = "none";
    this.calendarTarget.style.display = "none";
  }

  showTimelineSample() {
    this.timelineTarget.style.display = "block";
    this.boardTarget.style.display = "none";
    this.listTarget.style.display = "none";
    this.calendarTarget.style.display = "none";
  }

  showCalendarSample() {
    this.calendarTarget.style.display = "block";
    this.timelineTarget.style.display = "none";
    this.boardTarget.style.display = "none";
    this.listTarget.style.display = "none";
  }
}
