class ChannelsController < ApplicationController

	def new
		@channel = channel.new

	end

	def index
    @channel = channel.all
	end


	def show
    @channel = channel.find(params[:id])
	end


	def create
    @channel = channel.new(clean)
		if @channel.save
			redirect_to channels_path
		else
		  redirect_to channels_path
		end
	end

  def edit
    @channel = channel.find(params[:id])
	end

	def destroy
    @channel = channel.find(params[:id])
	end


	def clean
    params.require(:channel).permit(:description , :name,:status)
	end
end
