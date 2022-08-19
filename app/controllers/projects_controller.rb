class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @project= Project.new
  end

  def create
    @kanban = Project.new(project_params)
    if @kanban.save
      redirect_to projects_path
    else
      render :new
    end
  end

  def show
    @project = Project.find(params[:id])
  end

  private

  def project_params
    params.require(:project).permit(:title,:content,:status)
  end
end
