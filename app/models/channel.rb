class Channel < ApplicationRecord

  belongs_to :user
  has_many :channels , through: :group




end
