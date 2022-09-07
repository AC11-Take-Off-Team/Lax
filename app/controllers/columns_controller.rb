class ColumnsController < ApplicationController
  before_action :find_project, only: %i[create]
  def create
    @project.columns.new(column_params)
    @project.save
    redirect_to board_project_path(@project)
  end

  def destroy
    column = Column.find(params[:id])
    column.destroy
    redirect_to board_project_path(column.project)
  end

  private
  
    def column_params
      params.require(:column).permit(:status, :position, :deleted_at)
    end
  
    def find_project
      @project = Project.find(params[:project_id])
    end
end
