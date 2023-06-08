class Api::ArticlesController < ApplicationController
    # lets say index that articles will return 25 articles at once

    def index 
        @articles = Article.includes(:author, :claps).last(25) # queries for 25 articles avoid n+1
        
        render 'api/articles/show'
    end

    def create 
        @article = Article.new(article_params)

        if @article.save 
            render json: @article
        else
            render json: @article.errors.full_messages, status: 422
        end
    end

    def destroy 
        @article = Article.find(params[:id])

        @article.destroy
    end

    def update 
        @article = Article.find(params[:id])

        @article.assign_attributes(article_params)

        @article.save!
    end

    def article_params
        params.require(:article).permit(:title, :body, :user_id)
    end
end
