class ColumnsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_project, only: %i[create]
  before_action :find_column, only: %i[update destroy create_task]
  before_action :find_task, only: %i[update_task destroy_task]

  def create
    if done_uniq(@project)
      redirect_to board_project_path(@project), notice: "名字：「完成」的區段已存在"
    else
      message = @column.create(column_params) ? "區段創立成功" : "區段創立失敗"
      redirect_to board_project_path(@project), notice: message
    end
  end

  def update
    if done_uniq(@column.project)
      redirect_to board_project_path(@column.project), notice: "名字：「完成」的區段已存在"
    else
      message = @column.update(column_params) ? "重新命名成功" : "重新命名失敗"
      redirect_to board_project_path(@column.project), notice: message
    end
  end

  def destroy
    @column.destroy
    redirect_to board_project_path(@column.project), notice: '區段刪除成功'
  end

  def create_task
    @task = @column.tasks.new(task_params.merge(project_id: @column.project.id))
    assign_user(params[:task]["user_id"])

    if @task.save
      redirect_to board_project_path(@column.project), notice: '任務建立成功'
    else
      redirect_to board_project_path(@column.project), notice: '任務建立失敗'
    end
  end

  def update_task
    assign_user(params[:task]["user_id"])
    message = @task.update(task_params) ? "任務修改成功" : "任務修改失敗"
    redirect_to board_project_path(@task.project), notice: message
  end

  def destroy_task
    @task.destroy
    redirect_to board_project_path(@task.project), notice: '任務刪除成功'
  end

  private

  def done_uniq(project)
    project.columns.find_by(status: "完成") && params[:column]["status"] = "完成"
  end

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
    @project = current_user.projects.find(params[:project_id])
  end

  def find_column
    @column = Column.find(params[:id])
  end

  def find_task
    @task = Task.find(params[:task_id])
  end

  def assign_user(user_id)
    # 用find_by 是為了有些任務還沒有人接取
    user = User.find_by(id: user_id)
    @task.user = user
  end
end
