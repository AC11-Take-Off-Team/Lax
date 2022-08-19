class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :content
      t.datetime :start_time
      t.string :status
      t.belongs_to :project, null: false, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end
    add_index :tasks, :deleted_at
  end
end
