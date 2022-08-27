class TasksController < ApplicationController
  before_action :find_task, only: %i[show edit update destroy]

  def index
  end

  def new
    @task = Task.new
  end

  def create
    @task = Project.find(params[:id]).tasks.new(task_params)
    if @task.save
      redirect_to projects_path
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    if @task.update(task_params)
      redirect_to projects_path
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    redirect_to projects_path
  end

  private

  def task_params
    params.require(:task).permit(:title, :content, :start_time, :end_time, :status, :deleted_at)
  end

  def find_task
    @task = Task.find(params[:id])
  end
end
