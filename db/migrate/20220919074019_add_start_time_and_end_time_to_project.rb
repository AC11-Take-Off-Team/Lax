class AddStartTimeAndEndTimeToProject < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :start_time, :datetime
    add_column :projects, :end_time, :datetime
  end
end