Rails.application.routes.draw do
  resources :rooms
  resources :projects do
    resources :tasks
    resources :boards do
      member do
      post :add_users
      end
    end
  end
end
