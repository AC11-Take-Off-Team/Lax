# frozen_string_literal: true

class GroupsController < ApplicationController
  before_action :find_group, only: %i[show edit update destroy join quit]

  def new
    @group = Group.new
  end

  def index
    @groups = @group_query.result.recent
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
    if not current_user.member_of?(@group)
      current_user.join!(@group)
      flash[:notice] = '已加入'
    end
  end

  def quit
    if current_user.member_of?(@group)
      current_user.quit!(@group)
      flash[:notice] = '已退出'
    end
  end

  private

  def group_params
    params.require(:group).permit(:description, :title)
  end

  def find_group
    @group = Group.find(params[:id])
  end
end
