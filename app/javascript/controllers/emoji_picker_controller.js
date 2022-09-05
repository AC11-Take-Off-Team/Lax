import { Controller } from "@hotwired/stimulus";
import { RichText } from "../classes/RichText.js";

 // Connects to data-controller="emoji-picker"
 export default class extends Controller {
   static targets = ["trixEditor", "pickerContainer"];
   connect() {
  console.log("connected to emoji-picker")
  const buttonString = this.emojiButtonString();
     const emojiButton = this.emojiButtonTemplate(buttonString);
     let picker;
     console.log(emojiButton)
     let richText = new RichText(picker, emojiButton);
   }
     emojiButtonTemplate(buttonString) {
      const domParser = new DOMParser();
      const emojiButton = domParser
        .parseFromString(buttonString, "text/html")
        .querySelector("button");
      return emojiButton;
    }
 
    emojiButtonString() {
      const buttonString = `<button class="trix-button" id="emoji-picker" data-trix-action="popupPicker" tabindex="1">😀</button>`;
      return buttonString;
   }
 }

