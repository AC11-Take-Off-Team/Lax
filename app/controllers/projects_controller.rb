class ProjectsController < ApplicationController
  before_action :find_user_project,only: [:show,:edit,:update,:destroy]

  def index
    @projects = current_user.projects.all
  end
  
  def new
    @project = Project.new
  end
  
  def create
    if @project = current_user.projects.create(project_params)
      redirect_to projects_path
    elsif 
      render :new
    end
  end
  
  def show
  end
  
  def edit
  end
  
  def update
  end
  
  def destroy
  end

  private
  
  def project_params
    params.require(:project).permit(:title,:content,:status,:deleted_at)
  end

  def find_user_project
    @project = current_user.projects.find(params[:id])
  end
end
