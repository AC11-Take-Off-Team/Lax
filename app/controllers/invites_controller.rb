class InvitesController < ApplicationController

  def send_mail
    InvitesMailer.welcome_email('feather080300@gmail.com', params[:email]).deliver_now
    redirect_to groups_path, notice: 'welcome to join us.'
  end
  # 把在mailer定義寄信的方法拿來使用並設定寄件人與收件人
  # 這裡因為沒有再申請寄信用的信箱所以暫時掛用我的mail來寄信
  # deliver_now 現在寄信
end
