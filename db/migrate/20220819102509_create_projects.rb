class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :content
      t.datetime :status

      t.timestamps
    end
  end
end
