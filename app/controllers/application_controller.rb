class ApplicationController < ActionController::Base
  # rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :configure_permitted_parameters, if: :devise_controller?
  # if: :devise_controller? 告訴ApplicationController，這是device的方法

  private

  def record_not_found
    render file: "#{Rails.root}/public/404.html",
           layout: false,
           status: 404
  end

  # device用來為增加欄位(清洗)的方法

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end

  def search_group
    @group_query = Group.ransack(params[:q])
  end

end
