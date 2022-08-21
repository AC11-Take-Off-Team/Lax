class User < ApplicationRecord
  #關聯
  has_many :user_tasks
  has_many :tasks, through: :user_tasks

  #驗證
  validates_uniqueness_of :username

  
end
