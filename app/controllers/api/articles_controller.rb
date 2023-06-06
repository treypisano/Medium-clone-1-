class Api::ArticlesController < ApplicationController
    # lets say index that articles will return 25 articles at once

    def index 
        @articles = Article.includes(:author).last(25) # queries for 25 articles avoid n+1
        
        render 'api/articles/show'
    end
end
