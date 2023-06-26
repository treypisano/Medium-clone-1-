class Comment < ApplicationRecord
    belongs_to :author,
        class_name: :User,
        foreign_key: :user_id

    belongs_to :article,
        class_name: :Article,
        foreign_key: :article_id

    validates :body, presence: true
end
