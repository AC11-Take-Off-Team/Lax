class AddTargetToProject < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :target, :text
  end
end
