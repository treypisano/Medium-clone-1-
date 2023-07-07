class User < ApplicationRecord
    before_validation :ensure_session_token
    validates :password, length: { minimum: 6 }, allow_nil: true

    has_secure_password

    validates :email, uniqueness: true, 
        format: { with: URI::MailTo::EMAIL_REGEXP, message:  "must be in email format" }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

    has_many :articles, 
        class_name: :Article, 
        foreign_key: :user_id

    has_many :clapped_articles, 
        through: :articles,
        source: :claps

    has_many :comments, 
        class_name: :Comment, 
        foreign_key: :user_id

    has_many :commented_articles,
        through: :comments, 
        source: :articles

    has_many :follows,
        class_name: :Follow,
        foreign_key: :followed_id

    has_many :followers,
        through: :follows,
        source: :follower

    has_many :followed_users,
        through: :follows,
        source: :followed_user

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

end
