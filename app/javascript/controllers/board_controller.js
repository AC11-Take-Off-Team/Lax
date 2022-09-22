import { Controller } from "stimulus";
import Sortable from "sortablejs";
import Rails from "@rails/ujs";
import Swal from "sweetalert2";

export default class extends Controller {
  static targets = ["status_list", "task_priority"];
  connect() {
    this.task_priorityTargets.forEach((priority) => {
      if (priority.textContent == "高") {
        priority.style.backgroundColor = "#b36bd4";
        priority.style.color = "white";
      } else if (priority.textContent == "中") {
        priority.style.backgroundColor = "#ec8d71";
      } else if (priority.textContent == "低") {
        priority.style.backgroundColor = "#9ee7e3";
      }
    });
    const projectID = this.element.dataset.projectId;
    const sortEvent = {
      animation: 150,
      handle: ".card-list", //拖拉的範圍
      draggable: ".card", //可拖拉的物件
      group: "shared",
      onEnd: (event) => {
        const columnID = event.to.dataset.columnId;
        const taskID = event.item.dataset.taskId;
        const data = new FormData();
        data.append("position", event.newIndex);
        data.append("task_id", taskID);
        data.append("column_id", columnID);
        Rails.ajax({
          url: `/api/v1/projects/${projectID}/sort_task_position`,
          type: "patch",
          data: data,
          success() {},
          error: (err) => {
            // Swal.fire('任務移動失敗');
            console.log(err);
          }
        });
      }
    };
    this.status_listTargets.forEach((list) => {
      new Sortable(list, sortEvent);
    });
    new Sortable(this.element, {
      draggable: ".cloumn_item",
      onEnd: (event) => {
        const columnID = event.item.dataset.columnId;
        const data = new FormData();
        data.append("position", event.newIndex);
        data.append("column_id", columnID);
        Rails.ajax({
          url: `/api/v1/projects/${projectID}/sort_column_position`,
          type: "patch",
          data: data,
          error: (err) => {
            Swal.fire("區塊移動失敗");
          }
        });
      }
    });
  }
  updateBtn(event) {
    console.log(event.target);

    const display =
      event.target.parentElement.parentElement.parentElement.querySelector(
        ".task_form"
      );
    const displayAttr = display.style.display;
    if (displayAttr === "block") {
      display.style.display = "none";
    } else {
      display.style.display = "block";
    }
  }
  column_display(event) {
    const display =
      event.target.parentElement.parentElement.parentElement.querySelector(
        ".column_display"
      );
    display.style.visibility == "visible"
      ? (display.style.visibility = "hidden")
      : (display.style.visibility = "visible");
  }
  updateColumn(event) {
    const status =
      event.target.parentElement.parentElement.parentElement.parentElement.querySelector(
        "h3"
      );
    const column_update =
      event.target.parentElement.parentElement.parentElement.parentElement.querySelector(
        ".column_update"
      );
    if (column_update.style.display == "block") {
      column_update.style.display = "none";
      status.style.display = "block";
    } else {
      status.style.display = "none";
      column_update.style.display = "block";
    }
  }
  card_nav(event) {
    const display =
      event.currentTarget.parentElement.parentElement.querySelector("nav");
    display.style.display == "block"
      ? (display.style.display = "none")
      : (display.style.display = "block");
  }
}
