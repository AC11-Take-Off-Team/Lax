import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["navBar", "navBtn", "favList"];

  // Navbar 開 & 收
  setNav() {
    let navStatus = JSON.parse(localStorage.getItem("NavClicked?"));

    if (navStatus == true) {
      this.navBarTarget.style.display = "block";
      localStorage.setItem("NavClicked?", false);
      this.navBtnTarget.style.position = "absolute";
      this.navBtnTarget.style.left = "80%";
      this.navBtnTarget.style.top = "0.75rem";
    } else {
      this.navBarTarget.style.display = "none";
      this.navBtnTarget.style.position = "fixed";
      this.navBtnTarget.style.left = "10%";
      this.navBtnTarget.style.top = "5rem";
      localStorage.setItem("NavClicked?", true);
    }
  }
}
