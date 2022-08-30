class AddGroupId < ActiveRecord::Migration[6.1]
  def change
    add_column :groups , :user_id , :integer
    add_index :groups , :user_id
  end
end
