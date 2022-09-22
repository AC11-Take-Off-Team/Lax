import { Controller } from "stimulus";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["joinMail", "content", "email"];
  joinOpen() {
    this.joinMailTarget.style.display = "block";
  }
  joinClose() {
    this.joinMailTarget.style.display = "none";
  }
  disconnect() {
    const content = this.contentTarget.textContent;
    const data = new FormData();
    data.append("content", content);
    const projectID = this.element.dataset.projectId;
    Rails.ajax({
      url: `/api/v1/projects/${projectID}/change_content`,
      data: data,
      type: "patch",
      success: () => {},
      error: (err) => {
        console.log(err);
        Swal.fire("更改內容失敗");
      }
    });
  }
  join_member() {
    const email = this.emailTarget.value;
    const data = new FormData();
    data.append("email", email);
    const projectID = this.element.dataset.id;
    Rails.ajax({
      url: `/api/v1/projects/${projectID}/join_team`,
      type: "post",
      data: data,
      success: () => {},
      error: (err) => {
        Swal.fire("加入人員失敗");
      }
    });
  }
}
