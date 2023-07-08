json.user do
    json.extract! @user, :id, :email, :created_at
    json.followed_users do 
        @user.followed_users.each do |followed_user|
            json.set! followed_user.id do 
                json.extract! followed_user, :id, :email
            end
        end
    end
    
end