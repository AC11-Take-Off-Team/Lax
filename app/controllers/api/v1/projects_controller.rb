class Api::V1::ProjectsController < ApplicationController
  before_action :find_column, only: %i[sort_task_position sort_column_position]

  def join_team
    user = User.find_by(email: params[:email])
    project = Project.find(params[:id])

    if project.users.ids.include?(user.id)
      redirect_to project, notice: '已有此成員！'
    elsif user.present?
      project.users << user
      redirect_to project, notice: '成員加入project！'
    end
  end

  def sort_task_position
    task = Task.find(params[:task_id])
    # position要+1的原因是position的起始值是1，但是newIndex的起始值是0
    task.update(column: @column)
    task.insert_at(params[:position].to_i + 1)
    render json: { state: 'OK' }
  end

  def sort_column_position
    @column.insert_at(params[:position].to_i + 1)
  end
  
  def change_content
    project = Project.find(params[:id])
    project.update(content: params[:content])
  end

  def chart
    project = Project.find(params[:id])
    column_done = project.columns.find_by(status: '完成')
    @users = project.users
    @task_count = @users.map{ |user| user.tasks.select{|task| task if task.column != column_done}.count}
    render json: [@users,@task_count]
  end

  private

  def find_column
    @column = Column.find(params[:column_id])
  end
end
