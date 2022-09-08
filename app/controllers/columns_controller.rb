class ColumnsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_project, only: %i[create]
  before_action :find_column, only: %i[update destroy create_task]
  before_action :find_task, only: %i[update_task destroy_task]
  def create
    @project.columns.new(column_params)
    @project.save
    redirect_to board_project_path(@project)
  end

  def update
    if @column.update(column_params)
      redirect_to board_project_path(@column.project),notice: "重新命名成功"
    else
      redirect_to board_project_path(@column.project),notice: "重新命名失敗"
    end
  end

  def destroy
    @column.destroy
    redirect_to board_project_path(@column.project)
  end

  def create_task
    @column.tasks.new(task_params)
    assign_user(params[:task]["user_id"].to_i)

    if @column.save
      redirect_to board_project_path(@column.project)
    else
      redirect_to board_project_path(@column.project), notice: '任務建立失敗'
    end
  end

  def update_task
    @column = @task.column
    assign_user(params[:task]["user_id"].to_i)
    @task.update(task_params)
    redirect_to board_project_path(@column.project)
  end

  def destroy_task
    @task.destroy
    redirect_to board_project_path(@task.column.project)
  end

  private
  
    def column_params
      params.require(:column).permit(:status, :position, :deleted_at)
    end

    def task_params
      date = params[:task][":start_time, :end_time"].split(" to ")
      if date.any?
        start_time = Time.parse(date.first)
        end_time = Time.parse(date.last)
      end
      params.require(:task).permit(:title, :content, :start_time, :end_time, :deleted_at, :priority).merge({ start_time:, end_time: })
    end
  
    def find_project
      @project = Project.find(params[:project_id])
    end

    def find_column
      @column = Column.find(params[:id])
    end

    def find_task
      @task = Task.find(params[:task_id])
    end

    def assign_user(user_id)
      user = User.find_by(id: user_id)
      @task.user = user if user
    end
end
