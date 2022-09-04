class Order < ApplicationRecord
  include AASM
  belongs_to :user
  
  validates :price, :state, presence: true

  before_create :create_serial

  aasm column: "state", no_direct_assignment: true do 
    state :pending, initial: true
    state :paid, :refunded, :cancelled, :failed

    event :pay do 
      transitions from: [:panding, :failed], to: :paid
    end

    event :fail do
      transitions from: :panding, to: :failed
    end

    event :cancel do 
      transitions from: [:panding, :failed], to: :cancelled
    end

    event :refund do 
      transitions from: :paid, to: :refunded
    end
  end

  private
  #建立訂單編號
  def create_serial
    now = Time.now
    self.serial = "LAX%d%02d%02d%s" % [now.year,now.month,now.day,SecureRandom.alphanumeric(5)]
  end 

end
