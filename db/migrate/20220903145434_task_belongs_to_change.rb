class TaskBelongsToChange < ActiveRecord::Migration[6.1]
  def change
    remove_reference :tasks, :projects
    add_reference :tasks, :columns
  end
end
