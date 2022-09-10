class Project < ApplicationRecord
  acts_as_paranoid
  after_create :create_column

  has_many :user_projects
  has_many :users, through: :user_projects
  has_many :columns,-> { order(position: :asc) }, dependent: :destroy

  has_many :tasks

  validates :title, presence: true

  private

  def create_column
    ["待辦事項", "進行中", "完成"].each do |status|
      self.columns.create(status: status)
    end
  end
end
