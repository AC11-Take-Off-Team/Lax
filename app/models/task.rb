class Task < ApplicationRecord
  acts_as_paranoid
  acts_as_list

  belongs_to :column
  has_one :user_task
  has_one :user, through: :user_task

  validates :title, presence: true
end
