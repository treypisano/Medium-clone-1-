class AddToArticle < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :title, :string, null: false
    add_column :articles, :body, :text, null: false
    add_reference :articles, :users, foreign_key: true
  end
end
