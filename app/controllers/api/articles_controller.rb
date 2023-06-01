class Api::ArticlesController < ApplicationController
    # lets say index that articles will return 25 articles at once

    def index 
        @articles = Article.take(25) # queries for 25 articles
        
        render 'api/articles/show'
    end
end
