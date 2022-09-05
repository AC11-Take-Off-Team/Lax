class Project < ApplicationRecord
  acts_as_paranoid

  has_many :user_projects
  has_many :users, through: :user_projects
  has_many :tasks

  validates :title, presence: true
end
