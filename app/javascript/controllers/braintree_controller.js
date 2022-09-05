import { Controller } from "stimulus";
import dropin from "braintree-web-drop-in"
export default class extends Controller{
  static targets = ["payment"]
  connect(){
    const { token } = this.element.dataset;

    dropin.create({
      authorization: token,
      container: this.paymentTarget,
    })
    .then((instance) => {
      console.log(instance);
    })
    .catch((err) => {
      console.log(err);
    })
    // console.log(this.paymentTarget);
  }
}