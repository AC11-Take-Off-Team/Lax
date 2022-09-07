class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :content
      t.string :status
      t.string :deleted_at

      t.timestamps
    end
    add_index :projects, :deleted_at
  end
end
