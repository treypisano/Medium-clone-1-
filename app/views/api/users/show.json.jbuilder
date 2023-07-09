json.user do
    json.follows do
        @user.follows.each do |follow|
            json.extract! follow, :id, :follower_id, :followed_id
        end
    end
    
    json.extract! @user, :id, :email, :created_at

    json.followed_users do 
        @user.followed_users.each do |followed_user|
            json.set! followed_user.id do 
                json.extract! followed_user, :id, :email
            end
        end
    end
end