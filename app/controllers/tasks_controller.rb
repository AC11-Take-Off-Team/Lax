class TasksController < ApplicationController
  before_action :find_project, only: %i[create update]

  def create
    @task = @project.tasks.new(task_params.merge(create_task_params))
    # create_task_params在private
    @task.users << task_user if @task_user.blank? && task_user.present?
    # task_user在private
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
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to board_project_path(@task.project.id)
  end

  private

  def task_params
    params.require(:task).permit(:title, :content, :start_time, :end_time, :status, :deleted_at)
  end

  def find_project
    @project = Project.find(params[:project_id])
  end

  def create_task_params
    date = params[:task][":start_time, :end_time"].split(" to ")
    start_time = Time.parse(date.first)
    end_time = Time.parse(date.last)
    { status: 'todo', start_time:, end_time: }
  end

  def task_user
    User.find_by(nickname: params[:task]["task_user"])
  end
end
