Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    get "claps/:userId/:articleId", to: "claps#destroy"
    resources :users, only: [:create]
    resource :session, only: [:create, :show, :destroy]
    resources :articles, only: [:show, :index, :create, :destroy, :update] do 
      resources :claps, only: [:destroy, :index]
    end
    resources :claps, only: [:create]
    resources :comments, only: [:create, :destroy, :update, :index]
    resources :follows, only: [:create, :destroy]
  end
  get '*path', to: "static_pages#frontend_index"

end
