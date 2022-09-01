class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]
  has_many :user_projects
  has_many :projects, through: :user_projects
  validates :nickname, presence: true, uniqueness: true
  has_many :channels
  has_many :groups, through: :channels

  def join?(group)
    groups.find_by(id: group).present?
  end

  # google oauth2
  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
        user = User.create(
          email: data['email'],
          password: Devise.friendly_token[0,20]
        )
    end
    user
  end



  # def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
  #   data = access_token.info
  #   user = User.where(google_token: access_token.credentials.token, google_uid: access_token.uid ).first    
  #   if user
  #     return user
  #   else
  #     existing_user = User.where(email: data["email"]).first
  #     if  existing_user
  #       existing_user.google_uid = access_token.uid
  #       existing_user.google_token = access_token.credentials.token
  #       existing_user.save!
  #       return existing_user
  #     else
  #   # Uncomment the section below if you want users to be created if they don't exist
  #       user = User.create(
  #           name: data["name"],
  #           email: data["email"],
  #           password: Devise.friendly_token[0,20],
  #           google_token: access_token.credentials.token,
  #           google_uid: access_token.uid
  #         )
  #     end
  #   end
  # end


end
