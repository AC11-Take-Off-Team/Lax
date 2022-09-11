class ColumnsController < ApplicationController
  before_action :find_project, only: %i[create]
  before_action :find_column, only: %i[update destroy]
  def create
    @project.columns.new(column_params)
    @project.save
    redirect_to board_project_path(@project)
  end

  def update
    if @column.update(column_params)
      redirect_to board_project_path(@column.project), notice: "重新命名成功"
    else
      redirect_to board_project_path(@column.project), notice: "重新命名失敗"
    end
  end

  def destroy
    @column.destroy
    redirect_to board_project_path(@column.project)
  end

  private

  def column_params
    params.require(:column).permit(:status, :position, :deleted_at)
  end

  def find_project
    @project = Project.find(params[:project_id])
  end

  def find_column
    @column = Column.find(params[:id])
  end
end
