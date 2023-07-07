class FixFollows < ActiveRecord::Migration[7.0]
  def change
    remove_column :follows, :users_id
  end
  add_reference :follows, :user, foreign_key: true

end
