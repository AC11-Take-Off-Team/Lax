import { Controller } from "stimulus";
export default class extends Controller {
  switchToMonth() {
    const event = new CustomEvent("switchToMonth");
    window.dispatchEvent(event);
  }
  switchToWeek() {
    const event = new CustomEvent("switchToWeek");
    window.dispatchEvent(event);
  }
  switchToDay() {
    const event = new CustomEvent("switchToDay");
    window.dispatchEvent(event);
  }
}
