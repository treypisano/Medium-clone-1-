Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :show, :destroy]
    resources :articles, only: [:show, :index, :create, :destroy, :update]
    resources :claps, only: [:create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"

end
