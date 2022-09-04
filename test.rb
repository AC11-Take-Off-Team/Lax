def create_serial
  require "securerandom"

  now = Time.now
  "LAX%d%02d%02d%s" % [now.year,now.month,now.day,SecureRandom.alphanumeric(5)]
end 

p create_serial