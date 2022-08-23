class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    my_message = ApplicationController.render(
      partial: 'messages/my_message',
      locals: {message: message}
  )

  their_message = ApplicationController.render(
    partial: 'messages/their_message',
    locals: {message: message}
)
  
  ActionCable.server.broadcast "room_channel_#{message.room_id}", my_message: my_message, their_message: their_message, message: message
  end
end
