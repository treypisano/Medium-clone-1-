class Api::ClapsController < ApplicationController

    def create 
        @clap = Clap.new(clap_params)

        if @clap.save 
            render json: @clap
        else
            render json: @clap.errors.full_messages, status: 422
        end
    end

    def clap_params 
        params.require(:clap).permit(:user_id, :article_id)
    end
end
