class BoardsController < ApplicationController
  def index
    @task_to_do = Task.where(status: "to_do")
  end
end
