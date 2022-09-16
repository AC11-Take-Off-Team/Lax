class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user_project, only: %i[show edit update destroy board calendar]

  def index
    @projects = current_user.projects
  end

  def new
    @project = Project.new
  end

  def create
    project = current_user.projects.new(project_params.merge(owner_id: current_user.id))

    if project.save
      project.users << current_user
      redirect_to projects_path, notice: '專案建立成功'
    else
      render :new, notice: '專案建立失敗'
    end
  end

  def show
  end

  def edit
  end

  def update
    if @project.update(project_params)
      redirect_to projects_path, notice: '專案修改成功'
    else
      render :edit, notice: '專案修改失敗'
    end
  end

  def destroy
    @project.destroy
    redirect_to projects_path, notice: '專案刪除成功'
  end

  def leave_project
    remove_project(params[:id], current_user)
    redirect_to projects_path, notice: '已退出專案'
  end

  def kick_out
    user = User.find(params[:id])
    remove_project(params[:project_id], user)
    if user == current_user
      redirect_to projects_path, notice: '已退出專案'
    else
      redirect_to project_path(params[:project_id]), notice: '已將成員退出專案'
    end
  end

  def board
    @new_task = Task.new
    @new_column = Column.new
    @columns = @project.columns.order(position: :asc)
    @user = @project.users
  end

  def calendar
  end

  private

  def project_params
    params.require(:project).permit(:title, :content, :status, :deleted_at, :owner_id)
  end

  def find_user_project
    @project = current_user.projects.find(params[:id])
  end

  def remove_project(project_id, user)
    project = user.projects.find(project_id)
    project.users.destroy(user)
  end
end
