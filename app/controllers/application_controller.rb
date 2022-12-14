class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_locale
  # I18n
  def set_locale
    session[:locale] = params[:locale] if params[:locale] && I18n.available_locales.include?(params[:locale].to_sym)
  end

  before_action :set_locale
  # I18n
  def set_locale
    session[:locale] = params[:locale] if params[:locale] && I18n.available_locales.include?(params[:locale].to_sym)

  end

  private

  def record_not_found
    render file: "#{Rails.root}/public/404.html",
           layout: false,
           status: 404
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
