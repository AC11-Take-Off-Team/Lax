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
      this.navBtnTarget.style.left = "0";
      this.navBtnTarget.style.top = "5rem";
      localStorage.setItem("NavClicked?", true);
    }
  }

  // Favorite 開 & 收
  setFav() {
    let favStatus = JSON.parse(localStorage.getItem("favClicked?"));

    if (favStatus == true) {
      this.favListTarget.style.display = "none";
      localStorage.setItem("favClicked?", false);
    } else {
      this.favListTarget.style.display = "block";
      localStorage.setItem("favClicked?", true);
    }
  }
}
