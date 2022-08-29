import { Controller } from "stimulus";
import Sortable from 'sortablejs';
import Rails from '@rails/ujs';


export default class extends Controller {
  static targets = [ "todo","doing","done" ]

  connect() {
    let projectID = this.element.dataset.projectId
    const sortEvent = {
      animation: 150,
      handle: ".card-list",
      draggable: ".card",
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
  }
}
