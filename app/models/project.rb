class Project < ApplicationRecord
  #關聯
  has_many :tasks
  #驗證
  validates :title,:content,presence: true
end
