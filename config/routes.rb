Rails.application.routes.draw do
  devise_for :users
  resources :rooms
  root to: "home#index"
  resources :channels

end
