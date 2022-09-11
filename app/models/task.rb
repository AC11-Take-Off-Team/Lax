class Task < ApplicationRecord
  acts_as_paranoid
  acts_as_list

  belongs_to :project
  belongs_to :column
  has_one :user_task
  has_one :user, through: :user_task

  validates :title, presence: true

  def user_name
    user.email.split('@').first if user
  end
end
