class CreateArticlesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      
      t.timestamps
    end
    add_column :articles, :title, :string, null: false
      add_column :articles, :body, :text, null: false
      add_reference :articles, :user, foreign_key: true

  end
end
