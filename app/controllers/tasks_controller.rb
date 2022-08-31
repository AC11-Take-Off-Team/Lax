class TasksController < ApplicationController
  before_action :find_project, only: %i[create]
  before_action :find_task, only: %i[edit update destroy] 
  def create
    @task = @project.tasks.new(task_params.merge(status: 'todo'))
    # create_task_params在private
    @task.user = task_user if task_user.present?
    # debugger
    # task_user在private
    if @task.save
      redirect_to board_project_path(@project)
    else
      redirect_to board_project_path(@project), notice: '任務建立失敗'
    end
  end

  def edit
  end
  def update
    @task.user = task_user if task_user.present?
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

  # def merge_task_params
  #   date = params[:task][":start_time, :end_time"].split(" to ")
  #   if date.any?
  #     start_time = Time.parse(date.first)
  #     end_time = Time.parse(date.last)
  #   end
  #   { status: 'todo', start_time:, end_time: }
  # end

  def task_user
    User.find_by(nickname: params[:task]["task_user"]) || User.find_by(email: params[:task]["task_user"])
  end
end
