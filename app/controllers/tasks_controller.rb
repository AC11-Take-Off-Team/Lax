class TasksController < ApplicationController
    before_action :find_user_project

    def index
        render json: {tasks: @project.tasks}
    end

    private
    def find_user_project
        @project = current_user.projects.find(params[:project_id])
    end
end
