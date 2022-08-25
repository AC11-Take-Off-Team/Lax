class Project < ApplicationRecord
  acts_as_paranoid

  has_many :user_projects
  has_many :users,through: :user_projects

  validates :title,presences: true
end
