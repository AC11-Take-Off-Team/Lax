class Group < ApplicationRecord
  has_many :channels
  has_many :users, through: :channels
  has_one :room

  scope :recent, -> { order(created_at: :desc) }
end

private 
def create_room
  room.create(name: self.title)
end