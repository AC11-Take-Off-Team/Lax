import { Controller } from "stimulus";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Rails from "@rails/ujs";
import dayjs from "dayjs";

export default class extends Controller {
  initialize() {
    this.calendar = null;
    this.projectId = 0;
  }

  connect() {
    this.projectId = this.element.dataset.projectId;
    this.createCalendar();
    this.fetchTask();
  }

  addTask({ id, title, content, status: category, start_time: start, end_time: end }) {
    const calendarId = `cal-${this.projectId}`;
    return { id, calendarId, title, content, start, end, category };
  }

  fetchTask() {
    Rails.ajax({
      url: `/projects/${this.projectId}/tasks`,
      type: "GET",
      success: (tasks) => {
        tasks = Object.keys(tasks);
        this.calendar.createEvents(
          tasks.map((task) => {
            this.addTask(task);
          })
        );
      },
      error: (err) => {
        console.log("err" + err);
      }
    });
  }

  createCalendar() {
    this.calendar = new Calendar("#calendar", {
      useFormPopup: true,
      useDetailPopup: true,
      defaultView: "week",
      template: {
        time(event) {
          const { start, end, title } = event;

          return `<span style="color: white;">${dayjs(start, "HH:mm")}~${dayjs(
            end,
            "HH:mm"
          )} ${title}</span>`;
        },
        allday(event) {
          return `<span style="color: gray;">${title}</span>`;
        }
      },
      calendars: [
        {
          id: "status_todo",
          name: "Todo",
          backgroundColor: "#FCE542"
        },
        {
          id: "status_doing",
          name: "Doing",
          backgroundColor: "#00a9ff"
        },
        {
          id: "status_done",
          name: "Done",
          backgroundColor: "#03bd9e"
        }
      ]
    });
  }

  //  // 新增
  //  this.calendar.on("beforeCreateEvent", (eventObj) => {
  // });

  // // 更新
  // this.calendar.on("beforeUpdateEvent", ({ event, changes }) => {
  //   // this.calendar.updateEvent(event.id, event.calendarId, changes);
  // });

  // // 刪除
  // this.calendar.on("beforeDeleteEvent", (eventObj) => {
  //   // this.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
  // });
  // }

  // // 轉換成月曆
  // changeToMonth() {
  // this.calendar.changeView("month");
  // }
  // // 轉換成週曆
  // changeToWeek() {
  // this.calendar.changeView("week");
  // }
  // // 轉換成日曆
  // changeToDay() {
  // this.calendar.changeView("day");
}
