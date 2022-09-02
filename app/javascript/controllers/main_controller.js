import { Controller } from "stimulus";
import Calendar, { Month } from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

export default class extends Controller {
  showList() {
    const projectList = document.querySelector("nav[data-id=projectList]");
    console.log(projectList);

    projectList.style.visibility = "visible";
    projectList.style.opacity = "1";
  }

  colorSet() {
    const colorList = document.querySelector("nav[data-id=colorList]");

    colorList.style.visibility = "visible";
    colorList.style.opacity = "1";
  }

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
