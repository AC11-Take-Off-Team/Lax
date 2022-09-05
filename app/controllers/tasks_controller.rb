class TasksController < ApplicationController
    before_action :find_user_project

    def index
        render json: {tasks: @project.tasks}
    end

    def create
        @task = @project.tasks.new(params_task)

        if @task.save
            render json: { state: "success", task: @task}
        else
            render json: { state: "errors", errors: @task.errors.full_messages }
        end
    end

    private
    def find_user_project
        @project = current_user.projects.find(params[:project_id])
    end

    def params_task
        params.require(:task).permit(:title, :start_time, :end_time)
    end
end
