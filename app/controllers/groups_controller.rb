# frozen_string_literal: true

class GroupsController < ApplicationController
  before_action :find_group, only: %i[show edit update destroy join quit]

  def new
    @group = Group.new
  end

  def index
    @groups = @group_query.result.recent
    # @groups_user = current_user.groups.all
  end

  def show
  end

  def create
    current_user.groups.build(group_params)
    if current_user.save
      redirect_to groups_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to @group
    else
      render :edit
    end
  end

  def join
    current_user.groups << [@group]
    redirect_to group_path
    flash[:notice] = '已加入'
  end

  def quit

    current_user.groups.destroy(params[:id])
    redirect_to groups_path
    flash[:notice] = '已退出'

  end

  private

  def group_params
    params.require(:group).permit(:description, :title)
  end

  def find_group
    @group = Group.find(params[:id])
  end
end
