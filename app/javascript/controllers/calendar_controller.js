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

  addTask({ id, title, start_time: start, end_time: end, isAllDay, category }) {
    let calendarId = "cal1";
    return { id, title, start, end, isAllDay, calendarId, category };
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
          footer: '<a href="/">Back to Home</a>',
        });
      },
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

          function formatTime(time) {
            const hours = `${time.getHours()}`.padStart(2, "0");
            const minutes = `${time.getMinutes()}`.padStart(2, "0");

            return `${hours}:${minutes}`;
          }
          return `<span style="color: white;">${formatTime(start)}~${formatTime(
            end
          )} ${title} </span>`;
        },
        allday(event) {
          return `<span style="color: black;">${event.title}</span>`;
        },
      },
      calendars: [
        {
          id: "cal1",
          name: "任務",
          backgroundColor: "#F596AA",
        },
      ],
      theme: {
        common: {
          backgroundColor: "rgb(250, 250, 250)",
          border: "1px solid rgb(189, 189, 189)",
        },
        week: {
          today: {
            color: "red",
            backgroundColor: "rgb(239, 235, 233)",
            border: "1px solid rgb(189, 189, 189)",
          },
        },
      },
    });
  }

  eventHandler() {
    this.calendar.on("beforeCreateEvent", (eventObj) => {
      const { title, start, end, isAllday, calendarId } = eventObj;

      let category = "time";

      if (isAllday === true) {
        category = "allday";
      } else if (title.includes("[MS]")) {
        category = "milestone";
      } else if (title.includes("[T]")) {
        category = "task";
      }

      const data = new FormData();
      data.append("task[title]", title);
      data.append("task[start_time]", dayjs(start).toISOString());
      data.append("task[end_time]", dayjs(end).toISOString());

      Rails.ajax({
        url: `/projects/${this.projectId}/tasks`,
        type: "POST",
        data,
        success: ({ task }) => {
          this.calendar.createEvents([
            this.addTask({ ...task, category, calendarId }),
          ]);
        },
        errors: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer:
              '<a href="/projects/${this.projectId}/calendar">Try again</a>',
          });
        },
      });
    });

    this.calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      const { id, calendarId } = event;

      const { title, start, end } = changes;

      const data = new FormData();
      title && data.append("task[title]", title);
      start && data.append("task[start_time]", start);
      end && data.append("task[end_time]", end);

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
              footer:
                '<a href="/projects/${this.projectId}/calendar">Try again</a>',
            });
          },
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
            footer:
              '<a href="/projects/${this.projectId}/calendar">Try again</a>',
          });
        },
      });
    });
  }

  switchToMonth() {
    this.calendar.changeView("month");
  }

  switchToWeek() {
    this.calendar.changeView("week");
  }

  switchToDay() {
    this.calendar.changeView("day");
  }
}
