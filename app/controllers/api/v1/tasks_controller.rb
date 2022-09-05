class Api::V1::TasksController < ApplicationController
  def status_done
    task = Task.find(params[:id])
    project = task.column.project
    column = project.column.find_by(status: '完成')
    task.column = column
    task.save
    redirect_to board_project_path(task.project)
  end
end
