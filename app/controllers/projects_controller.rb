class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user_project, only: %i[show edit update destroy board calendar burndown]

  def index
    @projects = current_user.projects.all
  end

  def new
    @project = Project.new
  end

  def create
    @project = current_user.projects.new(project_params.merge(owner_id: current_user.id))

    if @project.save
      redirect_to projects_path
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    if @project.update(project_params)
      redirect_to projects_path
    else
      render :edit
    end
  end

  def destroy
    @project.destroy
    redirect_to projects_path
  end

  def leave_project
    # 自己退出project，remove_project方法寫在private
    remove_project(params[:id], current_user)
    redirect_to projects_path
  end

  def kick_out
    user = User.find(params[:id])
    remove_project(params[:project_id], user)
    if user == current_user
      redirect_to projects_path
    else
      redirect_to project_path(params[:project_id])
    end
  end

  def board
    @task = Task.new
    @column = Column.new
    @columns = @project.columns.order(position: :asc)
    @tasks = Task.all
    @user = @project.users.all
  end

  def calendar
  end

  def burndown
    @task = @project.tasks.count
    @start_time = @project[:start_time]
    @end_time = @project[:end_time]
    @task_done = @project.columns.where(status: "完成").length - 1
  end

  private

  def project_params
    params.require(:project).permit(:title, :content, :status, :deleted_at, :owner_id, :start_time, :end_time)
  end

  def find_user_project
    @project = current_user.projects.find(params[:id])
  end

  def remove_project(project_id, user_id)
    Project.find(project_id).users.destroy([user_id])
  end
end
