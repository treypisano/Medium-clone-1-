class AddFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      
    end

    add_reference :follows, :users, foreign_key: true
  end
end
