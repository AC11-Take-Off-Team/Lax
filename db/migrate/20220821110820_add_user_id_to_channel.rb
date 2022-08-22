class AddUserIdToChannel < ActiveRecord::Migration[6.1]
  def change
    add_belongs_to :channels , :user
  end
end
