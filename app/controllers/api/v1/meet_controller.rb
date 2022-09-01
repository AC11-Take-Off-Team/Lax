class Api::V1::MeetController < ApplicationController
  before_action :authenticate_user!
  # before_action :find_id, only: [:show, :edit, :update, :destroy]
  
  def index
  end
  
  def new
  end
  
  def create
  end
  
  def show
  end
  
  def edit
  end
  
  def update
  end
  
  def destroy
  end
  
  private
  def clean_params
    # params.require(:).permit(:, :, :)
  end
  
  def find_id
  end
end
