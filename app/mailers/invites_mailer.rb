class InvitesMailer < ApplicationMailer
  def welcome_email(sender, receiver)
    mail(from: sender,to: receiver, subject: "Welcome!").tap do |message|
      message.mailgun_options = {
        "tag" => ["abtest-option-a", "beta-user"],
        "tracking-opens" => true,
        "tracking-clicks" => "htmlonly"
      }
    end
  end
end
