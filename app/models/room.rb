class Room < ApplicationRecord
  validates :name, presence: true
  has_many :messages
  belongs_to :group
end
