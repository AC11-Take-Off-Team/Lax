class RemoveNicknameFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :nickname
  end
end
