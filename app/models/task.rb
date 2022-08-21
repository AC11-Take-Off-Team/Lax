class Task < ApplicationRecord
  include AASM
  acts_as_paranoid
  #關聯
  belongs_to :project
  has_many :user_tasks
  has_many :users, through: :user_tasks
  #驗證
  validates :title,presence: true

  aasm column: "status" ,no_direct_assignment: true do
    state :to_do, initial: true
    state :doing, :done

    event :take do
      transitions from: :to_do, to: :doing
    end

    event :give_up do
      transitions from: :doing, to: :to_do
    end

    event :complete do
      transitions from: :doing, to: :done
    end
  end
  
end
