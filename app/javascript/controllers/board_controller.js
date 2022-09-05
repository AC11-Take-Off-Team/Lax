import { Controller } from "stimulus";
import Sortable from 'sortablejs';
import Rails from '@rails/ujs';


export default class extends Controller {
  static targets = [ "todo","doing","done","task_create_display" ]
  connect() {
    let projectID = this.element.dataset.projectId
    const sortEvent = {
      animation: 150,
      handle: ".card-list",//拖拉的範圍
      draggable: ".card", //可拖拉的物件
      group: 'shared',
      onEnd:(event)=>{
        let status = event.to.dataset.boardTarget
        let taskID = event.item.dataset.taskId
        var data = new FormData();
        // data 會在下方ajax打進api
        data.append("position",event.newIndex);
        // event.newIndex是移動後的index值，起始值是0
        data.append("task_id",taskID)
        data.append("status",status)
        Rails.ajax({
          url:`/api/v1/projects/${projectID}/sort_position`,
          type: "post",
          data: data,
          success: ({state})=> {
            console.log(state);
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
    
    var todo = new Sortable(this.todoTarget,sortEvent)
    var doing = new Sortable(this.doingTarget,sortEvent)
    var done = new Sortable(this.doneTarget,sortEvent)

    // task update
    const updateBtn = document.querySelectorAll(".updateBtn")
    updateBtn.forEach((update)=>{
      update.addEventListener("click",(e)=>{
        let display = e.target.parentElement.querySelector('.task_update')
        console.log(display);
        if (display.style.display == "block"){
          display.style.display = "none"
        } else{
          display.style.display = "block"
        }
    })
  })
  }
  create(){
    const display = this.task_create_displayTarget
    if (display.style.display == "block"){
      display.style.display = "none"
    } else{
      display.style.display = "block"
    }
  }
}