class OrdersController < ApplicationController
  before_action : :authenticate_user!
  def new
    @order = Order.new
  end

  def create
    render html: params
  end
end
