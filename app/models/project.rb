class Project < ApplicationRecord
  acts_as_paranoid
  after_create :create_column

  has_many :user_projects
  has_many :users, through: :user_projects
  has_many :columns,-> { order(position: :asc) }, dependent: :destroy

  validates :title, presence: true

  private

  def create_column
    self.columns.create(status: "待辦事項")
    self.columns.create(status: "進行中")
    self.columns.create(status: "完成")
  end
end
