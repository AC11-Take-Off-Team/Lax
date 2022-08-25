class GroupsController < ApplicationController

  before_action :find_group,only:[:show , :edit , :update,:destroy , :join , :quit]

  def new
    @group = Group.new
  end

  def index
    @groups = current_user.groups.recent
    @group = @q.result(distinct: true)

  end

  def show
  end


  def create
    @group = current_user.groups.build(group_params)
    #@group.user = current_user
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

  def destroy
    if @group.destroy
      redirect_to groups_path
    else
      redirect_to groups_path
    end
  end


  def join
    # render html:params
    if not current_user.is_member_of?(@group)
      current_user.join!(@group)

    else
      flash[:notice] = "已加入"
    end
  end

  def quit
    if current_user.is_member_of?(@group)
      current_user.quit!(@group)
    else
      flash[:notice] = "已退出"
    end
  end




private

  def group_params
    params.require(:group).permit(:description ,:title)
  end

  def find_group
    @group = Group.find(params[:id])
  end

end

