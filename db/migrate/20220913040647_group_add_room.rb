class GroupAddRoom < ActiveRecord::Migration[6.1]
  def change
    add_reference :rooms, :group
  end
end
