class TaskBelongsToChange < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :columns
  end
end
