class InvitesMailer < ApplicationMailer

  def welcome_email(invite)

    mail to: invite, subject: "hello"
  end

end
