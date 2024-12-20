class Item < ApplicationRecord
  validates :name         , presence: true
  
  # 孫カテゴリのみを保存対象とするため、id=11~46を保存可能とする
  validates :category_id  , presence: true, format: { with: /\A1[1-9]|[2-3][0-9]|4[0-6]+\z/, message: "can't save value" }
  
  belongs_to :category
end