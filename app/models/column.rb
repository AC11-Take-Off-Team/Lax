class Column < ApplicationRecord
  acts_as_list
  belongs_to :project
  has_many :tasks,-> { order(position: :asc) }, dependent: :destroy
  validates :title, presence: true
end
