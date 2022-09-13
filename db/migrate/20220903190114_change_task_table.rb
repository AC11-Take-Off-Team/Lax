class ChangeTaskTable < ActiveRecord::Migration[6.1]
  def change
    remove_reference :tasks, :columns
    add_reference :tasks, :column
    remove_column :tasks, :status
    remove_column :tasks, :deleted_at
    add_column :tasks, :deleted_at, :datetime
    add_index :tasks, :deleted_at
  end
end
