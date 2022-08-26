class ApplicationController < ActionController::Base
  before_action :search

  def search
    @q = Group.ransack(params[:q])
  end
end
