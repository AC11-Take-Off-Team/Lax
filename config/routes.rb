Rails.application.routes.draw do
  devise_for :users
  resources :rooms
  root to: "home#index"
  resources :channels do
    member do
      post :join
      post :quit
    end
  end


end
