Rails.application.routes.draw do
  devise_for :users
  # get 'users/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  resources :projects do
    resources :tasks
    member do
      delete :leave_project
      delete :kick_out
      get :board
    end
  end

  namespace :api do
    namespace :v1 do
      resources :projects,only: [] do
        member do
          post :join_team
          #邀請成員加入project的api，請輸入 email:
        end
      end
    end
  end

end
