class User < ApplicationRecord
  validates_uniqueness_of :username

  has_many :user_tasks
  has_many :tasks, through: :user_tasks
end
