Rails.application.routes.draw do
  resources :rooms
  resources :projects do
    resources :tasks
    resource :kanbans,except: [:show]
  end
end
