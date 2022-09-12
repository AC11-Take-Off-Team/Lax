import consumer from "./consumer";

document.addEventListener("turbolinks:load", () => {
  const room_element = document.getElementById("room-id");
  const room_id = room_element.getAttribute("data-room-id");

  consumer.subscriptions.create(
    { channel: "RoomChannel", room_id: room_id },
    {
      connected() {
        console.log("connected to room" + room_id);
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        const user_element = document.getElementById("user-id");
        const user_id = user_element.getAttribute("data-user-id");

        let html;

        if (user_id == data.message.user_id) {
          html = data.my_message;
        } else {
          html = data.their_message;
        }

        const messageContainer = document.getElementById("messages");
        messageContainer.innerHTML = messageContainer.innerHTML + html;
      },
    }
  );
});
