import { Controller } from "stimulus"
import Sortable from 'sortablejs';

export default class extends Controller {
  connect() {
    new Sortable(this.element,{
      animation: 150,
      ghostClass: 'blue-background-class'
    })
  }
}
