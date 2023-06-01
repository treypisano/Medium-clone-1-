class Article < ApplicationRecord
    belongs_to :user,
        class_name: :User

    validates :title, presence: true
    validates :body, presence: true
end
