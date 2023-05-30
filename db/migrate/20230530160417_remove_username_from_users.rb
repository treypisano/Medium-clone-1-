class RemoveUsernameFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :username

    add_column :users, :email, :string, null: false, unique: true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
