class GroupsController < ApplicationController

  before_action :find_group,only:[:show , :edit , :update,:destroy , :join , :quit]

  def new
    @group = Group.new
  end

  def index
    @group = Group.order("created_at DESC")
    @group = @q.result(distinct: true)

  end

  def show
  end


  def create
    @group = current_user.groups.build(clean)
    if @group.save
      redirect_to groups_path
    else
      render :new
    end
  end

  def edit

  end

  def update
    if @group.update(clean)
      redirect_to @group
    else
      render :edit
    end
  end

  def destroy
    if @group.destroy
      redirect_to groups_path
    else
      redirect_to groups_path
    end
  end


  def join
    # render html:params
    if !current_user.is_member_of?(@group)
      current_user.joins(@group)

    else
      flash[:notice] = "已加入"
    end
  end

  def quit
    if current_user.is_member_of?(@group)
      current_user.quits(@group)
    else
      flash[:notice] = "已退出"
    end
  end

    def is_member_of?
    participated_groups.include?(group)
  end

  def joins(group)
    participated_groups << group
  end

  def quits(group)
    participated_groups.delete(group)
  end


private

  def clean
    params.require(:group).permit(:description ,:title)
  end

  def find_channel
    @group = Group.find(params[:id])
  end

end

