# frozen_string_literal: true

class Group < ApplicationRecord
  has_many :channels
  has_many :users, through: :channels

  scope :recent, -> { order(created_at: :desc) }
end
