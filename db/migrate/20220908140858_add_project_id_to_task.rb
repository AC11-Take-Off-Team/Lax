class AddProjectIdToTask < ActiveRecord::Migration[6.1]
  def change
    add_reference :tasks, :project
  end
end
