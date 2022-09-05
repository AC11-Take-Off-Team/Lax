import { Controller } from "stimulus";
import picker from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Rails from "@rails/ujs"


export default class extends Controller {
  static targets = [ "datepicker","task_display","column_status" ]
  
  initialize(){
    this.datePicker = picker(this.datepickerTargets,{
      mode: "range"
    })//使this.element變成月曆畫面
  }
  connect(){
  }
  display_change(){
    const display = this.task_displayTarget
    if (display.style.display == "block"){
      display.style.display = "none"
    } else{
      display.style.display = "block"
    }
  }
  selectdate(){
    var start_time = this.datePicker.selectedDates[0]
    var end_time = this.datePicker.selectedDates[1]
    var data = new FormData();
    data.append("start_time",start_time)
    if (end_time !== undefined){
      data.append("end_time",end_time) 
    }
  }
  taskPost(){
    let projectID = this.element.dataset.projectId
    Rails.ajax({
      url: `/projects/${projectID}/tasks?status=${aaa}`,
      type: "post",
      success: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log("error" + err)
      },
    })
  }
}
