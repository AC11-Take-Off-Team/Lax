Rails.application.routes.draw do
  resources :rooms
  resources :projects do
    resources :kanbans,except: [:show]
  end
end
