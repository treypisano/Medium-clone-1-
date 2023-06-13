class AddToClap < ActiveRecord::Migration[7.0]
  def change
    add_reference :claps, :users, foreign_key: true 
    add_reference :claps, :articles, foreign_key: true 

    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
