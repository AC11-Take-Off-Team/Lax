class AddNicknameToGroup < ActiveRecord::Migration[6.1]
  def change
    add_column :groups , :nickname , :string
  end
end
