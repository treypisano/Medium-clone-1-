class Follow < ApplicationRecord
    belongs_to :followed_user, class_name: "User", foreign_key: "followed_id"
    belongs_to :follower, class_name: "User", foreign_key: "follower_id"
end

# A Follow belongs to a follower and a followed
# Both of these associations are users, but they serve different roles

# Followed_user ---- User being followed
# Follower      ---- User doing the following