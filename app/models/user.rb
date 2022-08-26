# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :channels
  has_many :groups, through: :channels

  def member_of?(group)
    channels.find_by(group_id: group.id).present?
  end

  # def join!(group)
  #   #channels << group
  #    channels.create(group: group)
  # end

  # def quit!(group)
  #   channels.delete(group)
  # end
end
