import { Controller } from "stimulus";

export default class extends Controller {
  changeToMonth() {
    const event = new CustomEvent("changeToMonth");
    window.dispatchEvent(event);
  }
  changeToWeek() {
    const event = new CustomEvent("changeToWeek");
    window.dispatchEvent(event);
  }
  changeToDay() {
    const event = new CustomEvent("changeToDay");
    window.dispatchEvent(event);
  }
}
