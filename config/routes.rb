Rails.application.routes.draw do
  resources :rooms
  resources :kanbans,except: [:show]
end
