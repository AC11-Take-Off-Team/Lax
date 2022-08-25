class Api::V1::ProjectsController < ApplicationController
  def join_team
    #邀請成員加入project的api
    user = User.find_by(email: params[:email])
    project = Project.find_by(params[:id])
    project.users << [user]
  end
end
