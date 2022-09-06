class Api::V1::ProjectsController < ApplicationController
  def join_team
    user = User.find_by(email: params[:email])
    project = Project.find_by(id: params[:id])

    if project.users.ids.include?(user.id)
      redirect_to project, notice: '已有此成員！'
    elsif user.present?
      project.users << [user]
      redirect_to project, notice: '成員加入project！'
    end
  end

  def sort_position
    @column = Column.find_by(id: params[:column_id])
    @task = Task.find_by(id: params[:task_id])
    @task.insert_at(params[:position].to_i + 1)
    # position要+1的原因是position的起始值是1，但是newIndex的起始值是0
    @task.column = @column
    @task.save
    render json: { state: 'OK' }
  end

  def column_position
    @column = Column.find(params[:column_id])
    @column.insert_at(params[:position].to_i + 1)
    @column.save
  end
end
