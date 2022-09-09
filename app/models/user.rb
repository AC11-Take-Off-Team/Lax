class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]
  has_many :user_projects
  has_many :projects, through: :user_projects
  has_many :user_tasks
  has_many :tasks, through: :user_tasks
  has_many :channels
  has_many :groups, through: :channels

  def join?(group)
    groups.find_by(id: group).present?
  end

  # google 登入
  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first
    # Uncomment the section below if you want users to be created if they don't exist
    user ||= User.create(
      email: data['email'],
      password: Devise.friendly_token[0, 20]
    )
    user
  end
end
