class AddIndexFollows < ActiveRecord::Migration[7.0]
  def change
    add_index :follows, :followed_id
    add_index :follows, :follower_id
    #Ex:- add_index("admin_users", "username")
  end
end
