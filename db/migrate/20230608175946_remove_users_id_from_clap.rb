class RemoveUsersIdFromClap < ActiveRecord::Migration[7.0]
  def change
    remove_column :claps, :users_id

    add_reference :claps, :user, foreign_key: true 

  end
end
