class InvitesController < ApplicationController

    def send_mail

    @invite = params[:email]
    InvitesMailer.welcome_email(@invite).deliver_now
    flash[:notice] = "已發送邀請"

  end
end
