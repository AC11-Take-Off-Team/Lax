class KanbansController < ApplicationController
  
  def index
    @kanbans = Task.all
  end

  def new
    @kanban = Task.new
  end

  def create
    @kanban = Project.find(params[:id]).tasks.new(kanban_params)
    if @kanban.save
      redirect_to project_kanbans_path
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def kanban_params
    params.require(:kanban).permit(:title,:content,:start_time,:status)
  end


end
