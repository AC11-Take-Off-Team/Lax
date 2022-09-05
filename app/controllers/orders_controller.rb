class OrdersController < ApplicationController
  before_action :authenticate_user!

  def new
    @order = Order.new
  end

  def create
    order = current_user.orders.new(price: 10)

    if order.save
      redirect_to pay_order_path(id: order.serial), notice: "訂單建立成功"
    else
      redirect_to plans_path, notice: "系統正在忙碌中，請稍後再試"
    end

  end
  
  # 串金流
  def pay
    @order = Order.find_by!(serial: params[:id])
    @token = gateway.client_token.generate
  end

  def sumbit_payment
    
  end

  private
  def order_parmas
    params.require(:oreders)
  end

  def gateway
    gateway = Braintree::Gateway.new(
      environment: :sandbox,
      merchant_id: ENV['MERCHANT_ID'],
      public_key: ENV['PUBLIC_KEY'],
      private_key: ENV['PRIVATE_KEY'],
    )
  end
end
