class ChannelsController < ApplicationController

	before_action :find_channel,only:[:show , :edit , :update,:destroy]

	def new
		@channel = Channel.new
	end

	def index
    @channel = Channel.all
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
		  redirect_to channels_path
		end
	end

  def edit

	end

	def update

		if @channel.update(clean)
			redirect_to channels_path
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

private

	def clean
    params.require(:channel).permit(:description ,:title,:status , :content)
	end

	def find_channel
    @channel = Channel.find(params[:id])
	end

end
