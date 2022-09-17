import { Controller } from 'stimulus';
import Rails from '@rails/ujs';
import Swal from 'sweetalert2';


export default class extends Controller {
  static targets = ['joinMail','content'];
  join_open(){
    this.joinMailTarget.style.display = "block"
  }
  join_close(){
    this.joinMailTarget.style.display = "none"
  }
  disconnect(){
    const content = (this.contentTarget.textContent);
    const data = new FormData();
    data.append('content', content)
    const projectID = this.element.dataset.projectId;
    Rails.ajax({
      url: `/api/v1/projects/${projectID}/change_target`,
      data :data,
      type: 'patch',
      success: () => {
      },
      error: (err) => {
        console.log(err);
        Swal.fire('更改內容失敗');
      },
    });
  }
}
