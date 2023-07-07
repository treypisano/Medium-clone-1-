class AddArticleIdToComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :comments, :articles, foreign_key: true
  end
end
