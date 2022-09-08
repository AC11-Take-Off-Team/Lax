Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  devise_scope :user do
    authenticated :user do
      root 'home#index', as: :authenticated_root
    end
  
    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  resources :projects do
    resources :tasks, shallow: true, only: [:create, :update, :destroy]
    member do
      delete :leave_project
      delete :kick_out
      get :board
    end
    resources :columns, shallow: true, only: [:create, :update, :destroy] do
      member do
        post :create_task
        patch :update_task
        delete :destroy_task
      end
    end
  end


  namespace :api do
    namespace :v1 do
      resources :projects,only: [] do
        member do
          post :join_team
          post :sort_position
          post :column_position
        end
      end
      resources :tasks,only: [] do
        member do
          post :status_done
        end
      end
    end
  end

  resources :groups do
    member do
      post :join
      post :quit
      post :content
    end
  end

  resources :messages
  resources :rooms

end
