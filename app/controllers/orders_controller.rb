class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :find_order, only: [:pay, :submit_payment]
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
    @token = gateway.client_token.generate
  end

  def submit_payment
    result = gateway.transaction.sale(
      amount: @order.price,
      payment_method_nonce: params[:nonce]
    )
    if result.success?
      @order.pay!
      # 轉去首頁
      redirect_to "/", notice: "交易成功"
    else
      @order.fail!
      redirect_to "/", notice: "交易失敗"
    end
  end

  private

  def find_order
    @order = Order.find_by!(serial: params[:id])
  end

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
