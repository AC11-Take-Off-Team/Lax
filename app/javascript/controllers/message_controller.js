import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["content"];

  connect() {}
  submit() {
    preventDefault;
    this.contentTarget.value = "";
  }
}
