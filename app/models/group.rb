class Group < ApplicationRecord
  has_many :channels
  has_many :users, through: :channels
  has_one :room

  scope :recent, -> { order(created_at: :desc) }

  def is_member_of?(user_id)
    users.find_by(id: user_id).present?
    # 判斷會員是否存在此ＧＲＯＵＰ
  end

  private

  def create_room
    room = Room.create(name: title)
    self.room = room
  end
end
