class User < ApplicationRecord
  validates_uniqueness_of :username
  def self.generate
    username = "#{("a".."z").to_a.sample}_#{(1..10).to_a.sample}"
    create(username: username)
  end
end
