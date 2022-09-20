import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  static targets = ["box"];

  connect() {}

  sendMessage() {
    const event = new CustomEvent("scrollToBottom");
    window.dispatchEvent(event);
  }
}
