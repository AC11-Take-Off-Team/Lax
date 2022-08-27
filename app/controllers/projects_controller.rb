class ProjectsController < ApplicationController
  before_action :find_user_project, only: %i[show edit update destroy]

  def index
    @projects = current_user.projects.all
  end

  def new
    @project = Project.new
  end

  def create
    current_user.projects.build(project_params.merge(owner_id: current_user.id))
    # owner_id: 用來記錄誰建立/擁有這個project。
    if current_user.save
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
    remove_project(params[:id], current_user)
    redirect_to projects_path
  end

  def remove_from_project
    user = User.find(params[:id])
    remove_project(params[:project_id], user)
    if user == current_user
      redirect_to projects_path
    else
      redirect_to project_path(params[:project_id])
    end
  end

  private

  def project_params
    params.require(:project).permit(:title, :content, :status, :deleted_at, :owner_id)
  end

  def find_user_project
    @project = current_user.projects.find(params[:id])
  end

  def remove_project(project_id, user_id)
    Project.find(project_id).users.destroy([user_id])
  end
end
