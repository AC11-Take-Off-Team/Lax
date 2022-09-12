class ApplicationMailer < ActionMailer::Base
  default from: 'ENV'
  layout 'mailer'
end
