import { Controller } from 'stimulus';
import Rails from '@rails/ujs';
import Swal from 'sweetalert2';

export default class extends Controller {
  static targets = ['doneBtn'];
  connect() {
    if (this.element.dataset.status == 'done') {
      this.doneBtnTarget.textContent = '☑';
    }
  }
  status_done() {
    this.element.textContent = '☑';
    const taskID = this.element.dataset.taskId;
    Rails.ajax({
      url: ` /api/v1/tasks/${taskID}/status_done`,
      type: 'post',
      error(err) {
        Swal.fire(
          "標記完成失敗"
        )
      },
    });
  }
}
