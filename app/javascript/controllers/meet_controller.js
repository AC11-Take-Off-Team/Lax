import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    const facingMode = "user";
    const constraints = {
      audio: false,
      video: {
        facingMode
      }
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      this.element.srcObject = stream;
      this.element.onloadedmetadata = () => {
        this.element.play();
      };
    })
    .catch((err) => {
    /* handle the error */
    });
  }
}
