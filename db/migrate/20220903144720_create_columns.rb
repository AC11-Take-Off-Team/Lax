class CreateColumns < ActiveRecord::Migration[6.1]
  def change
    create_table :columns do |t|
      t.string :status
      t.integer :position
      t.belongs_to :project, null: false, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :columns, :deleted_at
  end
end
