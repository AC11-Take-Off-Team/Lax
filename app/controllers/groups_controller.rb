class GroupsController < ApplicationController
  before_action :find_group, only: %i[show edit update destroy join quit content]

  def search
    @group_query = Group.ransack(params[:q])
  end


  def new
    @group = current_user.groups.new
  end

  def index
    @group = Group.recent
    @group = @group_query.recent
   end

  def show; end

  def create
    @group = current_user.groups.new(group_params)
    if @group.save
      redirect_to groups_path
    else
      render :new
    end
  end

  def edit; end

  def update
    if @group.update(group_params)
      redirect_to @group, notice: "已更新"
    else
      render :edit
    end
  end

  def join
      current_user.groups << @group
      redirect_to group_path, notice: "已加入"
  end

  def quit
    current_user.groups.destroy(params[:id])
    redirect_to groups_path, notice: '已退出'
  end

  def content; end

  private

  def group_params
    params.require(:group).permit(:description, :title)
  end

  def find_group
    @group = Group.find(params[:id])
  end

end


