class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates_uniqueness_of :username

  has_many :channels
  has_many :users , through: :group


  def join(group)
    participated_groups << group
  end

  def quit(group)
    participated_groups.delete(group)
  end

  def is_member_of?
    participated_groups.include?(group)
  end

end
