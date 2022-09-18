class HomeController < ApplicationController
  before_action :authenticate_user!
  def index

    @projects = current_user.projects
    @first_project = @projects.first
    @group = current_user.groups
    @groups = Group.all
    
    @undo_list = []
    @doing_list = []
    @done_list = []
    if @first_project
      @first_project.tasks.each do |task|
        task_status = Column.find(task.column_id)
        if task_status.status == "待辦事項"
          @undo_list << task
        elsif task_status.status == "進行中"
          @doing_list << task
        elsif task_status.status == "完成"
          @done_list << task
        end
      end
    end
  end
end
