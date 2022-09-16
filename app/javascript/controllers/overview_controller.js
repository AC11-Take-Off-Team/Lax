import { Controller } from 'stimulus';
import Rails from '@rails/ujs';
import Swal from 'sweetalert2';


export default class extends Controller {
  static targets = ['joinMail','project_target'];
  join_display(){
    console.log(this.joinMailTarget);
    this.joinMailTarget.style.display = "block"
  }
  input_project_target(){
    const targetValue = (this.project_targetTarget.textContent);
    const data = new FormData();
    data.append('target', targetValue)
    const projectID = this.element.dataset.projectId;
    Rails.ajax({
      url: `/api/v1/projects/${projectID}/set_target`,
      data :data,
      type: 'patch',
      success: () => {
      },
      error: (err) => {
        console.log(err);
        // Swal.fire('更改目標失敗');
      },
    });
  }
}
