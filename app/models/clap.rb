class Clap < ApplicationRecord
    belongs_to :article, class_name: "Article", foreign_key: "article_id"

    belongs_to :user, class_name: :User, foreign_key: "user_id"

    validates :article, uniqueness: {scope: :user, message: ": one like per article per user"}
end
