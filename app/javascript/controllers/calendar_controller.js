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
    this.task = []
  }

  connect() {
    this.projectId = this.element.dataset.projectId;
    this.createCalendar();
    this.eventHandler();
    this.fetchTask();
  }

  addTask({ id, title, content, status: status, start_time: start, end_time: end }) {
    const calendarId = `cal-${this.projectId}`;
    return { id, calendarId, title, content, start, end, status };
  }

  fetchTask() {
    Rails.ajax({
      url: `/projects/${this.projectId}/tasks`,
      type: "GET",
      success: ({tasks}) => {
        this.calendar.createEvents(
          tasks.map((task) => {
            return this.addTask(task);
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
        },
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

  eventHandler(){
    this.calendar.on('beforeCreateEvent', (eventObj) => {
      const {title, start, end, status} = eventObj
      
      const data = new FormData();
      data.append("task[title]", title);
      data.append("task[start_time]", dayjs(start).toISOString());
      data.append("task[end_time]", dayjs(end).toISOString());
      data.append("task[status]", status);
      

      Rails.ajax({
        url: `/projects/${this.projectId}/tasks`,
        type: 'POST',
        data,
        success: ({task}) => {
          return this.calendar.createEvents([this.addTask(task)])
        },
        errors: (err) => {
          console.log('err' + err);
        }
      })
    })

    this.calendar.on("beforeUpdateEvent", ({ event, changes }) => {
      const {id, calendarId} = event

      const { title, start, end, status } = changes

      const data = new FormData();
      title && data.append("task[title]", title);
      start && data.append("task[start_time]", start);
      end && data.append("task[end_time]", end);
      status && data.append("task[status]", status);
      
      Object.keys(changes).length !== 0 &&
        Rails.ajax({
          url: `/tasks/${id}?project_id=${this.projectId}`,
          type: 'PATCH',
          data,
          success: () => {
            this.calendar.updateEvent(id, calendarId, changes)
          },
          errors: (err) => {
            console.log('err' + err);
          }
      })
    });

    this.calendar.on("beforeDeleteEvent", (eventObj) => {
      const { id, calendarId } = eventObj

      Rails.ajax({
        url: `/tasks/${id}?project_id=${this.projectId}`,
        type: 'DELETE',
        success: () => {
          this.calendar.deleteEvent(id, calendarId);
        },
        errors: (err) => {
          console.log('err' + err);
          
        }
      })
      

      // this.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
    });
  }



  // // 刪除
  // this.calendar.on("beforeDeleteEvent", (eventObj) => {
  //   // this.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
  // });
  // }

  // 轉換成月曆
  changeToMonth() {
  this.calendar.changeView("month");
  }
  // 轉換成週曆
  changeToWeek() {
  this.calendar.changeView("week");
  }
  // 轉換成日曆
  changeToDay() {
  this.calendar.changeView("day");
  }
}