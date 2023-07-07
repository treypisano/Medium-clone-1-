class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(comments_params)

        if @comment.save  
            render :info
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def update 
        @comment = Comment.find(params[:id])

        @comment.assign_attributes(comments_params)

        if @comment.save! 
            render :info
        else 
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy 
        @comment = Comment.find(params[:id])

        if @comment.destroy # if comment is destroyed, let front end know what comment it is
            render :info
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def comments_params
        params.require(:comment).permit(:body, :article_id, :user_id, :id, :author)
    end
end