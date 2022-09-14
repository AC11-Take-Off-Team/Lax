import { Controller } from "@hotwired/stimulus";
 import { Controller } from "stimulus"


 
 export default class extends Controller {
   static targets = [ "content" ]
 
   connect() {
   }
  submit(){
    preventDefault
    this.contentTarget.value = ""
  }
 }
 
