class ChangeStatusToProject < ActiveRecord::Migration[6.1]
  def change
    change_column :projects, :status, :text
  end
end
