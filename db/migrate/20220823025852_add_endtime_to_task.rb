class AddEndtimeToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :end_time, :datetime
  end
end
