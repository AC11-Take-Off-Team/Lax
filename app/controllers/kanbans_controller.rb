class KanbansController < ApplicationController
  
  def index
  end

  def new
    @kanban = Kanban.new
  end

  def create
    @kanban = Project.kanbans.new(kanban_params)
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def kanban_params
    params.require(:params).permit(:title,:content,:start_time,:status)
  end


end
