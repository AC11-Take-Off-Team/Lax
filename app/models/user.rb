class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  has_many :channels
  has_many :groups ,through: :channels

  def is_member_of?(group)
    channels.include?(group)
  end

  def join!(group)
    channels << group
  end

  def quit!(group)
    channels.delete(group)
  end
end
