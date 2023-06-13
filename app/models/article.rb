class Article < ApplicationRecord
    belongs_to :author,
        class_name: :User,
        foreign_key: :user_id

    has_many :claps,
        class_name: :Clap,
        foreign_key: :article_id

    validates :title, presence: true
    validates :body, presence: true
end
