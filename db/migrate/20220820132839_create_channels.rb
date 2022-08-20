class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|
      t.string :title
      t.string :description
      t.string :content
      t.string :status

      t.timestamps
    end
  end
end
