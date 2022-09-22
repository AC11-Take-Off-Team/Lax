import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["box"];

  connect() {}

  scrollToBottom() {
    setTimeout(() => {
      this.boxTarget.scrollTop = this.boxTarget.scrollHeight;
    }, 150);
  }
}
