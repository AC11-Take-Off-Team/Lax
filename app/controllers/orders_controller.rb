class OrdersController < ApplicationController
  before_action :authenticate_user!
  def new
    @order = Order.new
  end

  def create
    order = current_user.orders.new(price: 10)

    if @order.save
      redirect_to pay_order_path(order), notice: "訂單建立成功"
    else
      redirect_to plans_path, notice: "系統正在忙碌中，請稍後再試"
    end

  end
end
