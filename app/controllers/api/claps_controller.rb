class Api::ClapsController < ApplicationController

    def create 
        @clap = Clap.new(clap_params)

        if @clap.save 
            render :show
        else
            render json: @clap.errors.full_messages, status: 422
        end
    end

    def index 
        claps = {}
        Clap.where({article_id: params[:article_id]}).find_each do |clap|
            claps[clap.id] = (clap)
        end
        
        render json: claps
    end

    def destroy 
        @clap = Clap.find_by({user_id: params[:user_id], article_id: params[:article_id]})

        if @clap.destroy
            render :show
        else
            render json: @clap.errors.full_messages, status: 422
        end
    end

    def clap_params 
        params.require(:clap).permit(:user_id, :article_id)
    end
end
