class HomeController < ApplicationController
  def index
    @projects = Project.current_user.all
  end
end
