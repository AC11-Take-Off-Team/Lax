class Order < ApplicationRecord
  belongs_to :user

  validates :serial, :price, :state, presence: true
end
