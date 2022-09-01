class TasksController < ApplicationController
  before_action :find_project, only: %i[create]
  before_action :find_task, only: %i[edit update destroy]
  def create
    @task = @project.tasks.new(task_params.merge(status: 'todo'))
    # create_task_params在private
    user = User.find_by(id: params[:task]["user_id"])
    @task.user = user if user.present?
    # task_user在private
    if @task.save
      redirect_to board_project_path(@project)
    else
      redirect_to board_project_path(@project), notice: '任務建立失敗'
    end
  end

  def edit
    @user = @task.project.users.all
  end

  def update
    user = User.find_by(id: params[:task]["user_id"])
    @task.user = user if user.present?
    @task.update(task_params)
    redirect_to board_project_path(@task.project.id)
  end

  def destroy
    @task.destroy
    redirect_to board_project_path(@task.project.id)
  end

  private

  def task_params
    date = params[:task][":start_time, :end_time"].split(" to ")
    if date.any?
      start_time = Time.parse(date.first)
      end_time = Time.parse(date.last)
    end
    params.require(:task).permit(:title, :content, :start_time, :end_time, :status, :deleted_at).merge({ start_time:, end_time: })
  end

  def find_task
    @task = Task.find(params[:id])
  end

  def find_project
    @project = Project.find(params[:project_id])
  end

end
