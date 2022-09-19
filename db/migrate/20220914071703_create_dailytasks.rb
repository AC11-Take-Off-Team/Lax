class CreateDailytasks < ActiveRecord::Migration[6.1]
  def change
    create_table :dailytasks do |t|
      t.integer :task_sum
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
