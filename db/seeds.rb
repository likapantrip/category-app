# 親カテゴリー
ladies,mens,baby = Category.create([{name: "レディース"}, {name: "メンズ"},{name: "ベビー・キッズ"}])

# 子カテゴリー
tops_ladies,bottoms_ladies = ladies.children.create([{name: "トップス"},{name: "ボトムス"}])
tops_mens,bottoms_mens = mens.children.create([{name: "トップス"},{name: "ボトムス"}])
kidsw_baby,omutu_baby,toy_baby = baby.children.create([{name: "キッズウェア"},{name: "おむつ/トイレ/バス"},{name: "おもちゃ"}])

# 孫カテゴリー
## レディース
tops_ladies.children.create([{name: "Tシャツ/カットソー(半袖/袖なし)"}, {name: "Tシャツ/カットソー(七分/長袖)"},{name: "シャツ/ブラウス(半袖/袖なし)"},{name: "その他"}])
bottoms_ladies.children.create([{name: "デニム/ジーンズ"},{name: "ショートパンツ"},{name: "カジュアルパンツ"},{name: "キュロット"},{name: "スカート"},{name: "その他"}])

## メンズ
tops_mens.children.create([{name: "Tシャツ/カットソー(半袖/袖なし)"}, {name: "Tシャツ/カットソー(七分/長袖)"},{name: "シャツ/ブラウス(半袖/袖なし)"},{name: "その他"}])
bottoms_mens.children.create([{name: "デニム/ジーンズ"},{name: "ショートパンツ"},{name: "カジュアルパンツ"},{name: "キュロット"},{name: "スカート"},{name: "その他"}])

## ベビー・キッズ
["コート","トップス","スカート","パンツ","ワンピース","セットアップ"].each do |name|
  kidsw_baby.children.create(name: name)
end

["おむつ用品","おまる/補助便座","トレーニングパンツ","ベビーバス","お風呂用品","その他"].each do |name|
  omutu_baby.children.create(name: name)
end

["おふろのおもちゃ","がらがら","知育玩具","その他"].each do |name|
  toy_baby.children.create(name: name)
end