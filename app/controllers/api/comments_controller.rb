class Api::CommentsController < ApplicationController

    def create
        @comment = Comment.new(comments_params)

        if @comment.save 
            render json: @comment
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def comments_params
        params.require(:comment).permit(:body, :article_id, :user_id)
    end
end