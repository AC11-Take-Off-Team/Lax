class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
<<<<<<< HEAD
    @projects = current_user.projects
=======
    @projects = current_user.projects.all
>>>>>>> d5781db0 (解衝突)
  end
end
