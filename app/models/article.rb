class Article < ApplicationRecord
    belongs_to :author,
        class_name: :User,
        foreign_key: :user_id

    validates :title, presence: true
    validates :body, presence: true
end
