class HomeController < ApplicationController
  def index

    @projects = current_user.projects
    @first_project = @projects.first
    @groups = current_user.groups
    # 撈代辦
    # undo_list = Columns.where(status: "待辦事項").where(project_id: @first_project.id)
    # @undo_tasks = undo_list
  end
end
