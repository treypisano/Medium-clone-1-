@articles.each do |article|
    json.set! article.id do 
        json.extract! article, :id, :title, :body, :user_id, :created_at
        json.extract! article.author, :email
    end
end