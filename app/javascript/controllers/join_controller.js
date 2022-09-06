import { Controller } from "stimulus";
import Rails from "@rails/ujs"


export default class extends Controller {
  static targets = ["email"]
  connect(){
  }
  join_member(){
    let email = this.emailTarget.value
    let data = new FormData();
    data.append("email",email)
    let projectID = (this.element.dataset.id);
    Rails.ajax({
      url: `/api/v1/projects/${projectID}/join_team`,
      type: "post",
      data: data,
      success: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log("error" + err)
      },
    })

  }
  
}
