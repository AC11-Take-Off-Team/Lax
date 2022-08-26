class ProjectsController < ApplicationController
  before_action :find_user_project, only: %i[show edit update destroy]

  def index
    @projects = current_user.projects.all
  end

  def new
    @project = Project.new
  end

  def create
    current_user.projects.build(project_params)
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
    Project.find(params[:id]).users.destroy([current_user])
    redirect_to projects_path
  end

  private

  def project_params
    params.require(:project).permit(:title, :content, :status, :deleted_at)
  end

  def find_user_project
    @project = current_user.projects.find(params[:id])
  end
end
