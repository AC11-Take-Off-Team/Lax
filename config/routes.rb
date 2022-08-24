Rails.application.routes.draw do
  resources :messages
  resources :rooms
  mount ActionCable.server => '/websocket'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
