class TasksController < ApplicationController
  before_action :find_project, only: %i[new create]
  before_action :find_task, only: %i[update destroy]

  def create
    @task = @project.tasks.new(task_params.merge(status: 'todo'))
    # create_task_params在private
    assign_user(params[:task]["user_id"].to_i)
    # assign_user在private 判斷user_id如果在project，就存入
    if @task.save
      redirect_to board_project_path(@project)
    else
      redirect_to board_project_path(@project), notice: '任務建立失敗'
    end
  end

  def update
    @project = @task.project
    assign_user(params[:task]["user_id"].to_i)
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
    params.require(:task).permit(:title, :content, :start_time, :end_time, :status, :deleted_at, :priority).merge({ start_time:, end_time: })
  end

  def find_task
    @task = Task.find(params[:id])
  end

  def find_project
    @project = Project.find(params[:project_id])
  end

  def assign_user(user_id)
    return unless @project.users.ids.include?(user_id)

    user = User.find_by(id: user_id)
    @task.user = user
  end
end
