import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["content"];

  connect() {}
  // submit() {
  //   console.log("in0");
  //   this.contentTarget.value = "";
  // }

  sendMessage() {
    const event = new CustomEvent("scrollToBottom");
    window.dispatchEvent(event);
  }
}
