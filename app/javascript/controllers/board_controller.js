import { Controller } from "stimulus";
import Sortable from 'sortablejs';
import Ri from '@rails/ujs';


export default class extends Controller {
  static targets = [ "todo","doing","done" ]

  connect() {
    let projectID = this.element.dataset.projectId
    const sortEvent = {
      animation: 150,
      group: 'shared',
      onEnd:(evt)=>{
        let status = evt.to.dataset.boardTarget
        let taskID = evt.item.dataset.taskId
        var data = new FormData();
        data.append("position",evt.newIndex);
        data.append("task_id",taskID)
        data.append("status",status)
        Ri.ajax({
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
