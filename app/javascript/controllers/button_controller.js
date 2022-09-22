import { Controller } from "stimulus";
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ["box"];
  initialize() {}

  close() {
    console.log(this.boxTarget);

    this.boxTarget.style.display = "none";
  }
}
