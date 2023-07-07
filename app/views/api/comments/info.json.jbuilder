json.extract! @comment, :id, :body
json.author do 
    json.extract! @comment.author, :email
end
json.article_id @comment.article.id