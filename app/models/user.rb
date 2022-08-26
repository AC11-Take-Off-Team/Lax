class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :user_projects
  has_many :projects, through: :user_projects

  validates :nickname, presence: true, uniqueness: true
  has_many :channels
  has_many :groups ,through: :channels

  def is_member_of?(group)
    channels.find_by(group_id: group.id).present?
    # channels.include?(group)
  end

  def join!(group)
    channels << group
    # channels.create(group: group)
  end

  def quit!(group)
    channels.delete(group)
  end
end
