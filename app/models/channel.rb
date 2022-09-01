# frozen_string_literal: true

class Channel < ApplicationRecord
  belongs_to :user
  belongs_to :group
end
