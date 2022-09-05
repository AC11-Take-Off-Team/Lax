class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :find_project, only: %i[create]
  before_action :find_column, only: %i[create]
  before_action :find_task, only: %i[update destroy]

  def create
    # debugger
    @task = @column.tasks.new(task_params)
    assign_user(params[:task]["user_id"].to_i)
    # assign_user在private 判斷user_id如果在project，就存入
    
    if @task.save
      redirect_to board_project_path(@project)
    else
      redirect_to board_project_path(@project), notice: '任務建立失敗'
    end
  end

  def update
    @project = @task.column.project
    assign_user(params[:task]["user_id"].to_i)
    @task.update(task_params)
    redirect_to board_project_path(@project)
  end

  def destroy
    @task.destroy
    redirect_to board_project_path(@task.column.project)
  end

  private

  def task_params
    date = params[:task][":start_time, :end_time"].split(" to ")
    if date.any?
      start_time = Time.parse(date.first)
      end_time = Time.parse(date.last)
    end
    params.require(:task).permit(:title, :content, :start_time, :end_time, :deleted_at, :priority).merge({ start_time:, end_time: })
  end

  def find_task
    @task = Task.find(params[:id])
  end

  def find_project
    @project = Project.find(params[:project_id])
  end

  def find_column
    @column = Column.find_by(id: params[:column_id].to_i)
  end

  def assign_user(user_id)
    if @project.users.ids.include?(user_id)
      user = User.find_by(id: user_id)
      @task.user = user
    else
      @task&.user&.destroy(user_id)
    end
  end
end
