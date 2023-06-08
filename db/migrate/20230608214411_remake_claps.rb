class RemakeClaps < ActiveRecord::Migration[7.0]
  def change
    remove_column :claps, :articles_id

    add_reference :claps, :article, foreign_key: true 

  end
end
