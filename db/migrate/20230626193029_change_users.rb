class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :comments, :articles_id
    remove_column :comments, :users_id

    add_reference :comments, :user, foreign_key: true
    add_reference :comments, :article, foreign_key: true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
