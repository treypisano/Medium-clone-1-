@articles.each do |article|
    json.set! article.id do 
        json.extract! article, :id, :title, :body, :user_id, :created_at
        json.extract! article.author, :email
        json.claps article.claps

        json.comments do
            article.comments.each do |comment|
                json.set! comment.id do 
                    json.extract! comment, :body
                    json.author do 
                        json.extract! comment.author, :email
                    end
                end
            end
        end
    end
end