class Api::V1::ProjectsController < ApplicationController
  def join_team
    # 邀請成員加入project的api
    user = User.find_by(email: params[:email])
    project = Project.find_by(id: params[:id])

    if project.users.ids.include?(user.id)
      redirect_to projects_path, notice: '已有此成員！'
    else
      project.users << [user]
      redirect_to projects_path, notice: '成員加入project！'
    end
  end
end
