class PrivateButton < ActiveRecord::Migration[6.1]
  def change
    add_column :groups , :private , :boolean
  end
end
