// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"
import Calendar from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'



export default class extends Controller {

  connect() {
    const calendar = new Calendar('#calendar', {
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
  }
}
