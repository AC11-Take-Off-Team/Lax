class Api::V1::TasksController < ApplicationController
  def status_done
    task = Task.find(params[:id])
    task.status = "done"
    task.save
    redirect_to board_project_path(task.project)
  end
end
