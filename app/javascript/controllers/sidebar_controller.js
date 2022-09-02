import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["navBar", "navBtn"];

  // Navbar 開 & 收
  setNav() {
    let status = JSON.parse(localStorage.getItem("isClick"));

    if (status == true) {
      this.navBarTarget.style.display = "block";
      localStorage.setItem("isClick", false);
      this.navBtnTarget.style.position = "absolute";
      this.navBtnTarget.style.left = "80%";
      this.navBtnTarget.style.top = "0.75rem";
    } else {
      this.navBarTarget.style.display = "none";
      this.navBtnTarget.style.position = "fixed";
      this.navBtnTarget.style.left = "0";
      this.navBtnTarget.style.top = "5rem";
      localStorage.setItem("isClick", true);
    }
  }

  // Favorite 開 & 收
  setFav() {
    const favoriteList = document.querySelector("nav[data-id=favorite] div");
    favoriteList.style.display = "none";
  }
}
