class Clap < ApplicationRecord
    belongs_to :article, class_name: "Article", foreign_key: "articles_id"

    belongs_to :user, class_name: :User, foreign_key: "user_id"
end
