
import { Controller } from "stimulus"



export default class extends Controller {

  // 隱藏 Navbar (顯示尚未加)
  hideNav(){
    this.element.style.display = "none"
  }

  // 隱藏 Favorite (顯示尚未加)
  hideFav(){
    const favoriteList = document.querySelector("nav[data-id=favorite] div")
    favoriteList.style.display = "none"
  }
  
}
