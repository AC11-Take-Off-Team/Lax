import { Controller } from 'stimulus';


export default class extends Controller {
  static targets = ['joinMail'];
  join_display(){
    console.log(this.joinMailTarget);
    this.joinMailTarget.style.display = "block"
  }
}
