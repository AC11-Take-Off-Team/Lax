import { Controller } from "stimulus";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Rails from "@rails/ujs";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default class extends Controller {
  initialize() {
    this.calendar = null;
    this.projectId = 0;
    this.task = [];
  }

  connect() {
    this.projectId = this.element.dataset.projectId;
    this.createCalendar();
    this.eventHandler();
    this.fetchTask();
  }

  addTask({ id, title, status, start_time: start, end_time: end }) {
    const calendarId = `cal-${this.projectId}`;
    return { id, title, status, start, end, calendarId };
  }

  fetchTask() {
    Rails.ajax({
      url: `/projects/${this.projectId}/tasks`,
      type: "GET",
      success: ({ tasks }) => {
        this.calendar.createEvents(
          tasks.map((task) => {
            return this.addTask(task);
          })
        );
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="/">Back to Home</a>'
        });
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

          return `<span style="color: white;">${dayjs(start, "HH:mm")}~${dayjs(end, "HH:mm")} ${title}</span>`;
        },
        allday(event) {
          return `<span style="color: gray;">${event.title}</span>`;
        }
      },
      calendars: [
        {
          id: "cal1",
          name: "Todo",
          backgroundColor: "#FCE542"
        },
        {
          id: "cal2",
          name: "Doing",
          backgroundColor: "#00a9ff"
        },
        {
          id: "cal3",
          name: "Done",
          backgroundColor: "#03bd9e"
        }
      ]
    });
  }

  eventHandler() {
    this.calendar.on("beforeCreateEvent", (eventObj) => {
      const { title, start, end, status } = eventObj;

      const data = new FormData();
      data.append("task[title]", title);
      data.append("task[start_time]", dayjs(start).toISOString());
      data.append("task[end_time]", dayjs(end).toISOString());
      data.append("task[status]", status);

      Rails.ajax({
        url: `/projects/${this.projectId}/tasks`,
        type: "POST",
        data,
        success: ({ task }) => {
          return this.calendar.createEvents([this.addTask(task)]);
        },
        errors: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer:'<a href="/projects/${this.projectId}/calendar">Try again</a>'
          });
        }
      });
    });

    this.calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      const { id, calendarId } = event;

      const { title, start, end, status } = changes;

      const data = new FormData();
      title && data.append("task[title]", title);
      start && data.append("task[start_time]", start);
      end && data.append("task[end_time]", end);
      status && data.append("task[status]", status);

      Object.keys(changes).length !== 0 &&
        Rails.ajax({
          url: `/tasks/${id}?project_id=${this.projectId}`,
          type: "PATCH",
          data,
          success: () => {
            this.calendar.updateEvent(id, calendarId, changes);
          },
          errors: () => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="/projects/${this.projectId}/calendar">Try again</a>'
            });
          }
        });
    });

    this.calendar.on("beforeDeleteEvent", (eventObj) => {
      const { id, calendarId } = eventObj;

      Rails.ajax({
        url: `/tasks/${id}?project_id=${this.projectId}`,
        type: "DELETE",
        success: () => {
          this.calendar.deleteEvent(id, calendarId);
        },
        errors: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="/projects/${this.projectId}/calendar">Try again</a>'
          });
        }
      });
    });
  }

  changeToMonth() {
    this.calendar.changeView("month");
  }

  changeToWeek() {
    this.calendar.changeView("week");
  }

  changeToDay() {
    this.calendar.changeView("day");
  }
}
