import { Controller } from "stimulus";
import picker from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Rails from "@rails/ujs"


export default class extends Controller {
  connect(){
    const datePicker = picker(this.element,{
      mode: "range"
    })
  }
  selectdate(){
    const datePicker = picker(this.element,{
      mode: "range"
    })
    console.log(datePicker);
    var start_time = datePicker.selectedDates[0]
    console.log(start_time);
    var end_time = datePicker.selectedDates[1]
    var data = new FormData();
    data.append("start_time",start_time)
    if (end_time !== undefined){
      data.append("end_time",end_time) 
    }
  }
  taskPost(){
    let projectID = this.element.dataset.projectId
    Rails.ajax({
      url: `/projects/${projectID}/tasks`,
      type: "post",
      data: data,
      success: ({state}) => {
        console.log("ok");
      },
      error: (err) => {
        console.log("error" + err)
      },
    })
  }
  
}
