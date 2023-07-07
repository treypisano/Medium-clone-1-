class ChangeFollows < ActiveRecord::Migration[7.0]
  def change
    remove_column :follows, :user_id
    add_column :follows, :followed_id, :bigint, null: false
    add_column :follows, :follower_id, :bigint, null: false
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
