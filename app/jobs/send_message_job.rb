class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    my_message = ApplicationController.render(
      partial: 'messages/my_message',
      locals: { message: }
    )

    their_message = ApplicationController.render(
      partial: 'messages/their_message',
      locals: { message: }
    )
    ActionCable.server.broadcast "room_channel_#{message.room_id}", { my_message:, their_message:, message: }
  end
end
