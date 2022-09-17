class RemoveProjectTarget < ActiveRecord::Migration[6.1]
  def change
    remove_column :projects, :target
  end
end
