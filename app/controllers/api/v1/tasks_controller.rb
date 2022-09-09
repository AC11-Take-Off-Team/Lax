class Api::V1::TasksController < ApplicationController
  def status_done
    task = Task.find(params[:id])
    project = task.column.project
    column = project.columns.find_by(status: '完成')
    task.column = (column || project.columns.create(status: '完成'))
    task.save
    redirect_to board_project_path(project)
  end
end
