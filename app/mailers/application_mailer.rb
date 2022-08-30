class ApplicationMailer < ActionMailer::Base
  default from: 'smtp.mailgun.org'
  layout 'mailer'
end
