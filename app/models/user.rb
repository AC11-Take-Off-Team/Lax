# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :user_projects
  has_many :projects, through: :user_projects

  validates :nickname, presence: true, uniqueness: true

  has_many :channels
  has_many :groups, through: :channels

  def join?(group)
    groups.find_by(id: group).present?
  end
end
