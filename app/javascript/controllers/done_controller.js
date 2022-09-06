import { Controller } from "stimulus";
import Rails from '@rails/ujs';


export default class extends Controller {
  static targets = [ "doneBtn" ]
  connect(){
    if (this.element.dataset.status == "done"){
      this.doneBtnTarget.textContent = "☑"
    }
  }
  status_done(){
    this.element.textContent = "☑"
    let taskID = this.element.dataset.taskId
    Rails.ajax({
      url:` /api/v1/tasks/${taskID}/status_done`,
      type: "post",
      error(err){
        console.log(err);
      }
    })
  }
}
