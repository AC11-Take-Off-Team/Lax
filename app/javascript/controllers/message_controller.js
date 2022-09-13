import { Controller } from "@hotwired/stimulus";
 import { Controller } from "stimulus"


 
 export default class extends Controller {
   static targets = [ "content" ]
 
   connect() {
    console.log(aa);
   }
  submit(){
    preventDefault
    console.log(123);
    this.contentTarget.value = ""
  }
 }
 