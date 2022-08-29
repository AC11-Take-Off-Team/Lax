import { Controller } from "stimulus"
import Sortable from 'sortablejs'

export default class extends Controller {
  static targets = [ "todo" ]

  connect() {
    var sortable = new Sortable(this.todoTarget,{
      animation: 150,
      onEnd:(evt)=>{
        // console.log(evt.oldIndex);
        console.log(evt.newIndex);
        console.log(evt.to);
      }
    })
  }
  end(event){
    console.log(event);
  }
}
