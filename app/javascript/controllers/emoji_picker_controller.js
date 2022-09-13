import { Controller } from "@hotwired/stimulus";
 import { Controller } from "stimulus"
 import EmojiButton from "@picmo/popup-picker"

 
 export default class extends Controller {
   static targets = [ "button", "input" ]
 
   connect() {
    console.log('emoji:)');
    
     this.picker = new EmojiButton()
     this.picker.on('emoji', emoji => {
       this.buttonTarget.innerHTML = emoji
       this.inputTarget.value = emoji
     })
     console.log('this.picker');
     
   }
 
   toggle(event) {
     event.preventDefault()
     this.picker.togglePicker(event.target)
   }
  //  emojiButtonString() {
  //   const buttonString = `<button class="trix-button" id="emoji-picker" data-trix-action="popupPicker" tabindex="1">😀</button>`;
  //   return buttonString;
  // }
 }
 