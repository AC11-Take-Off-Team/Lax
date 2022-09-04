class Order < ApplicationRecord
  include AASM
  belongs_to :user

  validates :serial, :price, :state, presence: true

  aasm column: "state", no_direct_assignment: true do 
    state :pending, initial: true
    state :paid, :refunded, :cancelled, :fail

    event :pay do 
      transitions from: [:panding, :fail], to: :paid
    end

    event :fail do
      transitions from: :panding, to: :fail
    end

    event :cancel do 
      transitions from: [:panding, :fail], to: :cancelled
    end

    event :refund do 
      transitions from: :paid, to: :refunded
    end
  end

end
