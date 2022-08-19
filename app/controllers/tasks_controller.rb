class TasksController < ApplicationController
  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def create
    @task = Project.find(params[:project_id]).tasks.new(task_params)
    if @task.save
      redirect_to project_tasks_path
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def task_params
    params.require(:task).permit(:title,:content,:start_time,:status,:deleted_at)
  end

end
