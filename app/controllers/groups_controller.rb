class GroupsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_group, only: %i[show edit update destroy join quit content]

  def new
    @group = current_user.groups.new
  end

  def index
    @group_query = Group.ransack(params[:q])
    @group = Group.recent
    @group = @group_query.result if params[:q]
  end

  def show
    if  @group.users.include?(current_user)
      @room = @group.room
      render "/rooms/index"
    else
      redirect_to groups_path,notice: "非本頻道成員"
    end
  end

  def create
    @group = current_user.groups.new(group_params)
    if @group.save
      @group.room = Room.create(name: @group.title)


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
      redirect_to @group
    else
      render :edit
    end
  end

  def join

    if @group.private == true
    flash[:notice] = 'private'
    else
      current_user.groups << [@group]
      redirect_to group_path
    end
  end

  def quit
    current_user.groups.destroy(params[:id])
    redirect_to groups_path
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





