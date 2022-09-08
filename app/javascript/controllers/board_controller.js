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
        const columnID = event.to.dataset.columnId
        const taskID = event.item.dataset.taskId
        const data = new FormData();
        data.append("position",event.newIndex);
        // event.newIndex是移動後的index值，起始值是0
        data.append("task_id",taskID)
        data.append("column_id",columnID)
        Rails.ajax({
          url:`/api/v1/projects/${projectID}/sort_task_position`,
          type: "patch",
          data: data,
          error: (err) => {
            // alert(err)
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
          url:`/api/v1/projects/${projectID}/sort_column_position`,
          type: "patch",
          data: data,
          error: (err) => {
            alert(err)
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
  column_display(event){
    let display = event.target.parentElement.parentElement.querySelector(".column_display")
    if (display.style.visibility == "visible"){
      display.style.visibility = "hidden"
    } else{
      display.style.visibility = "visible"
    }
  }
  updateColumn(event){
    let ststus = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('h2')
    let column_update = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.column_update')
    if (column_update.style.display == "block"){
      column_update.style.display = "none"
      ststus.style.display = "block"
    } else{
      ststus.style.display = "none"
      column_update.style.display = "block"
    }
  }
}