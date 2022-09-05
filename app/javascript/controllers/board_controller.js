import { Controller } from "stimulus";
import Sortable from 'sortablejs';
import Rails from '@rails/ujs';


export default class extends Controller {
  static targets = [ "status_list" ]
  connect() {
    let projectID = this.element.dataset.projectId
    const sortEvent = {
      animation: 150,
      handle: ".card-list",//拖拉的範圍
      draggable: ".card", //可拖拉的物件
      group: 'shared',
      onEnd:(event)=>{
        let columnID = event.to.dataset.columnId
        let taskID = event.item.dataset.taskId
        let data = new FormData();
        // data 會在下方ajax打進api
        data.append("position",event.newIndex);
        // event.newIndex是移動後的index值，起始值是0
        data.append("task_id",taskID)
        data.append("column_id",columnID)
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
    this.status_listTargets.forEach((list)=>{
      new Sortable(list,sortEvent)
    })
    const column_sort = new Sortable(this.element,{
      onEnd:(event)=>{
        let columnID = event.item.dataset.columnId
        let data = new FormData();
        data.append("position",event.newIndex)
        data.append("column_id",columnID)
        Rails.ajax({
          url:`/api/v1/projects/${projectID}/column_position`,
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
    })

    // task update
    const updateBtn = document.querySelectorAll(".updateBtn")
    updateBtn.forEach((update)=>{
      update.addEventListener("click",(e)=>{
        let display = e.target.parentElement.querySelector('.task_update')
        if (display.style.display == "block"){
          display.style.display = "none"
        } else{
          display.style.display = "block"
        }
    })
  })
  }
}