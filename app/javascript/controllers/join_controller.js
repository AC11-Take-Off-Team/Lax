import { Controller } from "stimulus";
import Rails from "@rails/ujs"
import Swal from 'sweetalert2';


export default class extends Controller {
  static targets = ["email"]
  join_member(){
    const email = this.emailTarget.value
    const data = new FormData();
    data.append("email",email)
    const projectID = (this.element.dataset.id);
    Rails.ajax({
      url: `/api/v1/projects/${projectID}/join_team`,
      type: "post",
      data: data,
      success: () => {
      },
      error: (err) => {
        Swal.fire(
          "加入人員失敗"
        )
      },
    })

  }
  
}
