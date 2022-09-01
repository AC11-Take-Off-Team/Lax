Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  # get 'users/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_scope :user do
    authenticated :user do
      root 'home#index', as: :authenticated_root
    end
  
    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  resources :projects do
    resources :tasks
    member do
      delete :leave_project
      delete :remove_from_project
    end
  end

  namespace :api do
    namespace :v1 do
      resources :meet
      resources :projects,only: [] do
        member do
          post :join_team
          #邀請成員加入project的api，請輸入 email:
        end
      end
    end
  end

end
