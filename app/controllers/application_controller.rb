# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :search_group

  def search_group
    @group_query = Group.ransack(params[:q])
  end
end
