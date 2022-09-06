Rails.application.routes.draw do
  resources :messages
  resources :rooms
  devise_for :users
  # get 'users/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  resources :projects do
    resources :tasks, shallow: true, only: [:create, :update, :destroy]
    member do
      delete :leave_project
      delete :kick_out
      get :board
    end
    resources :columns, shallow: true, only: [:create, :update, :destroy]
  end


  namespace :api do
    namespace :v1 do
      resources :projects,only: [] do
        member do
          post :join_team
          post :sort_position
          post :column_position
          get :column
        end
      end
      resources :tasks,only: [] do
        member do
          post :status_done
        end
      end
    end
  end

end
