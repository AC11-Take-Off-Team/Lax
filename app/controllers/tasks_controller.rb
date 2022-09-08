class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user_project
  before_action :find_column, only: %i[create]
  before_action :find_task, only: %i[update destroy]

  def index
    render json: { tasks: @project.tasks }
  end

  def create
    @task = @project.tasks.new(params_task)

    if @task.save
      render json: { state: 'success', task: @task }
    else
      render json: { state: 'errors', errors: @task.errors.full_messages }
    end
  end

  def update
    @task = @project.tasks.find(params[:id])

    if @task.update(params_task)
      render json: { state: 'updated success' }
    else
      render json: { state: 'errors', errors: @task.errors.full_messages }
    end
  end

  def destroy
    @task = @project.tasks.find(params[:id])
    @task.destroy
  end

  private
  def find_user_project
    @project = current_user.projects.find(params[:project_id])
  end

  def params_task
    params.require(:task).permit(:title, :start_time, :end_time)
  end
end
