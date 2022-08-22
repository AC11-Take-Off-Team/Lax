class ChannelsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_channel,only:[:show , :edit , :update,:destroy , :join , :quit]

  def new
    @channel = Channel.new
  end

  def index
    @channel = Channel.order("created_at DESC")
    @q = Channel.ransack(params[:q])
    @channel = @q.result(distinct: true)
  end

  def show
  end


  def create
    @channel = Channel.new(clean)
    if @channel.save
      redirect_to channels_path
    else
      render :new
    end
  end

  def edit

  end

  def update

    if @channel.update(clean)
      redirect_to @channel
    else
      render :edit
    end
  end

  def destroy
    if @channel.destroy
      redirect_to channels_path
    else
      redirect_to channels_path
    end
  end


  def join
    # render html:params
    if !current_user.is_member_of?(@channel)
      current_user.join(@channel)

    else
      flash[:notice] = "已加入"
    end
  end

  def quit
    if current_user.is_member_of?(@channel)
      current_user.quit(@channel)
    else
      flash[:notice] = "已退出"
    end
  end


private

  def clean
    params.require(:channel).permit(:description ,:title,:status , :content)
  end

  def find_channel
    @channel = Channel.find(params[:id])
  end

end




