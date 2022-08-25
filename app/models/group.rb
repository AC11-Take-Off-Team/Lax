class Group < ApplicationRecord

  has_many :channels
  has_many :users ,through: :channels
end
