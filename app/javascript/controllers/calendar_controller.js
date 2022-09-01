import { Controller } from "stimulus"
import Calendar from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'

function formatTime(time) {
  const hours = `${time.getHours()}`.padStart(2, '0');
  const minutes = `${time.getMinutes()}`.padStart(2, '0')

  return `${hours}:${minutes}`
}

function uuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export default class extends Controller {

  // 初始化，讓其他方法都選得到 calendar
  initialize() {
    this.calendar = null
  }

  // 選染日曆
  connect() {
    this.calendar = new Calendar('#calendar', {
      defaultView: 'week',
      template: {
        time(event) {
          const { start, end, title } = event
    
          return `<span style="color: white;">${formatTime(start)}~${formatTime(end)} ${title}</span>`
        },
        allday(event) {
          return `<span style="color: gray;">${event.title}</span>`
        },
      },
      calendars: [
        {
          id: 'cal1',
          name: 'Personal',
          backgroundColor: '#03bd9e',
        },
        {
          id: 'cal2',
          name: 'Work',
          backgroundColor: '#00a9ff',
        },
      ], 
    })
  
  // 新增
    this.calendar.on('beforeCreateEvent', (eventObj) => {
      this.calendar.createEvents([
        {
          ...eventObj,
          id: uuid(),
        },
      ])
    })

  // 更新
    this.calendar.on('beforeUpdateEvent', ({ event, changes }) => {
      this.calendar.updateEvent(event.id, event.calendarId, changes);
    })

  // 刪除
    this.calendar.on('beforeDeleteEvent', (eventObj) => {
      this.calendar.deleteEvent(eventObj.id, eventObj.calendarId);
    })
  }

  // 跳出新增視窗
  addTask() {
    this.calendar.setOptions({
      useFormPopup: true,
      useDetailPopup: true,
    })
  }
}
