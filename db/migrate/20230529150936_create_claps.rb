class CreateClaps < ActiveRecord::Migration[7.0]
  def change
    create_table :claps do |t|

      t.timestamps
    end
  end
end
