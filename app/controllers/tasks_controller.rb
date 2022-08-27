class TasksController < ApplicationController
  before_action :find_task, only: %i[show edit update destroy]
  before_action :find_project, only: %i[create update]

  def create
    @task = @project.tasks.new(task_params.merge(status: 'todo'))
    if @task.save
      redirect_to board_project_path(@project)
    else
      redirect_to board_project_path(@project), notice: '任務建立失敗'
    end
  end

  def update
    @task.update(task_params)
    redirect_to board_project_path(@project)
  end

  def destroy
    @task.destroy
    redirect_to board_project_path(@project)
  end

  private

  def task_params
    params.require(:task).permit(:title, :content, :start_time, :end_time, :status, :deleted_at)
  end

  def find_task
    @task = Task.find(params[:id])
  end

  def find_project
    @project = Project.find(params[:project_id])
  end
end
