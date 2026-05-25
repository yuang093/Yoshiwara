// ============================================
// 吉原泡泡浴名店指南 - App JS
// ============================================

const STORAGE_KEY = 'yoshiwara_shops_v1';

// 🌟 直接將原 JSON 資料內嵌，徹底解決靜態 HTML 本地開啟時 fetch(shops.json) 的 CORS 阻擋限制
const rawShopsData = [
  {"id": 1, "name": "西月", "type": "超高級店", "foreign": "❌ 不接待", "url": "", "address": "test", "notes": "吉原三大名店之一，和式裝修，品質和服務極穩，安檢嚴格，黑服態度一般，不接待外國人"},
  {"id": 2, "name": "將軍", "type": "超高級店", "foreign": "—", "url": "", "address": "", "notes": "外觀平平無奇但價格昂貴（60分鐘入浴料需4萬9日元），完全預約制。老師招募極嚴格（排除抽菸、紋身、有疤痕及超過29歲的人）"},
  {"id": 3, "name": "老波頭愛之船", "type": "超級店", "foreign": "—", "url": "", "address": "", "notes": "吉原三大名店之一，以尺度大著稱的老牌店鋪，主打服務，每天在線約10位"},
  {"id": 4, "name": "路民館", "type": "超高級店", "foreign": "—", "url": "", "address": "", "notes": "老師有分牌等級，吸收了原「翡翠之夢」閉店後的多數女孩，質量和服務穩定"},
  {"id": 5, "name": "某會員制名店", "type": "超高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "吉原三大名店之一，屬會員制，不接待外國人"},
  {"id": 6, "name": "翡翠之夢", "type": "超高級店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "曾是服務與顏值極頂的名店，已於二月底突然閉店"},
  {"id": 7, "name": "Ailedore", "type": "高級店", "foreign": "✅ 接待", "url": "https://www.ailedore.jp/", "address": "", "notes": "對外國人服務非常好，無區別對待，強烈推薦"},
  {"id": 8, "name": "花園-Giardino", "type": "高級店", "foreign": "✅ 接待", "url": "https://www.y-giardino.jp/", "address": "4 Chome-41-15 Senzoku, Taito City, Tokyo 111-0031日本", "notes": "對外國人友好，主打20-30代，每天約10位在線，服務與對日本人一致"},
  {"id": 9, "name": "ペペピィーノ", "type": "高級店", "foreign": "✅ 接待", "url": "https://www.pepe-y.com/", "address": "4-chōme-24-16 Senzoku, Taito City, Tokyo 111-0031日本", "notes": "ペペピィーノ剛升級為高級店，女孩年輕可愛且照片無大差距，店員熱情禮貌，提供90分鐘起套餐"},
  {"id": 10, "name": "藍爵", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "老牌高級店，服務和口味穩定，房間和浴缸較大，建議提前預約"},
  {"id": 11, "name": "魯瑟利努", "type": "高級店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "去年剛開，環境不錯且可做90分鐘，但出勤人數太少"},
  {"id": 12, "name": "凡爾賽Versailles", "type": "高級店", "foreign": "❌ 不接待", "url": "https://y-versailles.com/top/", "address": "", "notes": "這是一家高級店 前面還有一家分店叫離宮 兩家店的老師都是共用的 每天在線30位左右 外國人只能進離宮"},
  {"id": 13, "name": "尼宮", "type": "高級店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "主打30-40代熟女，每天在線約50位，外國人可進但服務無驚豔處且不便宜"},
  {"id": 14, "name": "秘書室", "type": "高級店", "foreign": "⚠️ 不建議", "url": "https://www.hisyo.co.jp/", "address": "", "notes": "老牌店鋪，主打辦公室OL風，外國人極難進，常被忽悠去服務縮水的姐妹店"},
  {"id": 15, "name": "セグレターリオ", "type": "高級店", "foreign": "✅ 接待", "url": "https://segretario.jp/", "address": "4-chōme-25-11 Senzoku, Taito City, Tokyo 111-0031日本", "notes": "秘書室的姐妹店，外國人常被帶去，服務對外國人縮水，工作人員態度不佳"},
  {"id": 16, "name": "迎賓館", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "早上6點就開門，但房間小、老師少，服務和質量不佳"},
  {"id": 17, "name": "白夜", "type": "高級店", "foreign": "—", "url": "https://www.byakuya.jp/", "address": "", "notes": "主打30-40代熟女，少見地提供60分鐘起套餐，入浴費（門票）需2萬日元，不含女孩費用"},
  {"id": 18, "name": "馬丁尼", "type": "高級店", "foreign": "✅ 接待", "url": "https://rosso-martini.com/", "address": "4-chōme-23-1 Senzoku, Taito City, Tokyo 111-0031日本", "notes": "價格略高於同級別，但整體質量和服務較為穩定，接待外國人"},
  {"id": 19, "name": "藍", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "馬聽尼的姐妹店，質量與服務不如馬聽尼，不接待外國人"},
  {"id": 20, "name": "皇帝", "type": "高級店", "foreign": "✅ 接待", "url": "https://www.e-vip.co.jp/", "address": "", "notes": "主打服務，涵蓋各年齡段，對外國人中規中矩，每天在線約10位"},
  {"id": 21, "name": "阿普拉歌劇", "type": "高級店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "對外國人限制多、態度敷衍，有明顯區別對待"},
  {"id": 22, "name": "天了", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "主打身材豐滿，有水床服務，但服務一般且態度敷衍"},
  {"id": 23, "name": "兔子俱樂部", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "兔女郎主題，但服務普遍低於高級店正常水準"},
  {"id": 24, "name": "王氏", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "歐式風格，高端大氣，但服務一般且不接外國人"},
  {"id": 25, "name": "紅法", "type": "高級店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "人氣雖高，但對外國人只有敷衍與區別對待，每天約30位"},
  {"id": 26, "name": "呂地", "type": "高級店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "老牌店鋪但服務下滑嚴重，對外國人服務一般"},
  {"id": 27, "name": "脆", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "整體服務不錯，但不接待外國人"},
  {"id": 28, "name": "EXE", "type": "高級店", "foreign": "❌ 不接待", "url": "https://y-exe.jp/", "address": "", "notes": "顏值與資料很好，多為模特級別（頭牌夢二），不接待外國人"},
  {"id": 29, "name": "水色", "type": "高級店", "foreign": "—", "url": "https://mizuiroribbon.tokyo/", "address": "", "notes": "剛定位為高級店，但服務不好，素質和態度需提高"},
  {"id": 30, "name": "蔚藍海岸", "type": "高級店", "foreign": "✅ 接待", "url": "https://www.cote-dr.net/", "address": "4-chōme-16-4 Senzoku, Taito City, Tokyo 111-0031日本", "notes": "服務穩定，每天在線約20位"},
  {"id": 31, "name": "牛若丸", "type": "高級店", "foreign": "❌ 不接待", "url": "https://fujoho.jp/index.php?p=shop&id=1701", "address": "", "notes": "品質較不錯，不接外國人，若會日語可去碰運氣https://www.arvent.com/ushiwaka/"},
  {"id": 32, "name": "拉賓安樓玫瑰人生", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "剛裝修升級，但服務一般"},
  {"id": 33, "name": "BLUE TOKYO", "type": "高級店", "foreign": "—", "url": "https://www.bluechateau-tokyo.com/", "address": "", "notes": "硬體設施較好，但質量與服務還有待改進"},
  {"id": 34, "name": "盧宮", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "西月的姐妹店，採陽式（西式）裝修，顏值和服務不錯"},
  {"id": 35, "name": "天空", "type": "高級店", "foreign": "❌ 不接待", "url": "https://www.sky7400.com/", "address": "", "notes": "不接待外國人"},
  {"id": 36, "name": "羅佩他", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "不接待外國人"},
  {"id": 37, "name": "波", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "不接待外國人"},
  {"id": 38, "name": "吉原巧克力", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "不接待外國人"},
  {"id": 39, "name": "必所", "type": "高級店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "不接待外國人"},
  {"id": 40, "name": "Golden Blue", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "服務一般或在線人數不多"},
  {"id": 41, "name": "OTO", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "服務一般或在線人數不多"},
  {"id": 42, "name": "來子Club", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "服務一般或在線人數不多"},
  {"id": 43, "name": "Academy", "type": "高級店", "foreign": "—", "url": "https://www.academy-yoshiwara.com/", "address": "", "notes": "服務一般或在線人數不多"},
  {"id": 44, "name": "神旅的店", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "服務一般或在線人數不多"},
  {"id": 45, "name": "黑色法爾賽", "type": "高級店", "foreign": "—", "url": "", "address": "", "notes": "籌備中（福岡法爾賽姐妹店）"},
  {"id": 46, "name": "Princess Miss", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "提供許多高級店沒有的水床服務，每天約10位，接待外國人"},
  {"id": 47, "name": "Dent Club", "type": "大眾店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "主打40-60代超級熟女，進店前需有心理準備"},
  {"id": 48, "name": "Plant House", "type": "大眾店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "主打40-60代超級熟女，進店前需有心理準備"},
  {"id": 49, "name": "小偷 ad", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "皆為主打30-40代以上的熟女店鋪，服務層次不齊"},
  {"id": 50, "name": "貴公子", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "皆為主打30-40代以上的熟女店鋪，服務層次不齊"},
  {"id": 51, "name": "declection 地", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "皆為主打30-40代以上的熟女店鋪，服務層次不齊"},
  {"id": 52, "name": "Anis Coffee", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "Cosplay風格的店鋪，品質一般，對外國人收費極高"},
  {"id": 53, "name": "CPA", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "Cosplay風格的店鋪，品質一般，對外國人收費極高"},
  {"id": 54, "name": "鋪著", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "Cosplay風格的店鋪，品質一般，對外國人收費極高"},
  {"id": 55, "name": "馬西姆", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "「人造」差距特別嚴重"},
  {"id": 56, "name": "AUN (あうん)阿口云", "type": "大眾店", "foreign": "—", "url": "https://www.aun-net.com/", "address": "", "notes": "「人造」差距特別嚴重"},
  {"id": 57, "name": "華", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "「人造」差距特別嚴重"},
  {"id": 58, "name": "Select COT", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "房間太小放不下水床，無水床服務"},
  {"id": 59, "name": "卡拉富魯布", "type": "大眾店", "foreign": "—", "url": "", "address": "", "notes": "女孩年輕但沒服務，主打浪費時間與金錢"},
  {"id": 60, "name": "Sakura Spa", "type": "大眾店", "foreign": "—", "url": "https://fujoho.jp/index.php?p=shop&id=54652", "address": "", "notes": "泡泡浴加SPA流程，設施較舊，無水床服務"},
  {"id": 61, "name": "美女革命", "type": "大眾店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "名字唬人或品質一般，皆不接待外國人"},
  {"id": 62, "name": "M路", "type": "大眾店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "名字唬人或品質一般，皆不接待外國人"},
  {"id": 63, "name": "新天空", "type": "大眾店", "foreign": "❌ 不接待", "url": "https://new-sky.jp/", "address": "", "notes": "名字唬人或品質一般，皆不接待外國人"},
  {"id": 64, "name": "安完風", "type": "大眾店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "名字唬人或品質一般，皆不接待外國人"},
  {"id": 65, "name": "贏馬車", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "質量服務一般，或對外國人價格高，體驗非常差"},
  {"id": 66, "name": "多念人俱樂部", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "質量服務一般，或對外國人價格高，體驗非常差"},
  {"id": 67, "name": "哈魯布魯", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "質量服務一般，或對外國人價格高，體驗非常差"},
  {"id": 68, "name": "四季", "type": "大眾店", "foreign": "✅ 接待", "url": "https://www.soap-fourseason.com/", "address": "", "notes": "質量服務一般，或對外國人價格高，體驗非常差"},
  {"id": 69, "name": "比革們大個子", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "質量服務一般，或對外國人價格高，體驗非常差"},
  {"id": 70, "name": "歐西斯", "type": "大眾店", "foreign": "✅ 接待", "url": "", "address": "", "notes": "質量服務一般，或對外國人價格高，體驗非常差"},
  {"id": 71, "name": "エンジェルシリカ", "type": "激安店", "foreign": "⚠️ 不建議", "url": "https://a-silica.com/", "address": "", "notes": "這是一家激安店 它是NGL集團旗下的旗艦店 每天在線有30位左右 不接待外國人 所謂激安店 它的特點就是主打最便宜的店鋪 基礎套餐通常50分鐘起 早上也是很早就開門 基本上沒有什麼服務 主打的就是一個簡單粗暴 速戰速決 這種店不建議咱們去玩 因為便宜 許多日本老頭愛去 衛生和服務都無法保證 而且外國人家的料金一點也不比其他的高級店低多少。"},
  {"id": 72, "name": "咖貝魯", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "主打時尚辣妹風格，對外國人無驚豔處且價格不便宜"},
  {"id": 73, "name": "三", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差"},
  {"id": 74, "name": "媽是太路", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差"},
  {"id": 75, "name": "普動了", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差"},
  {"id": 76, "name": "金瓶梅", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差"},
  {"id": 77, "name": "卡酷拉玉店", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差"},
  {"id": 78, "name": "CL夢", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差"},
  {"id": 79, "name": "火箭妻子", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "主打30-40代熟女，貨不對板情況嚴重"},
  {"id": 80, "name": "W外", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "主打30-40代熟女，貨不對板情況嚴重"},
  {"id": 81, "name": "埃多魯偶像研究生", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "主打JK學院風格，女孩年輕但服務一般，外國人料金非常高"},
  {"id": 82, "name": "多了錢", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "主打JK學院風格，女孩年輕但服務一般，外國人料金非常高"},
  {"id": 83, "name": "MOMO", "type": "激安店", "foreign": "—", "url": "https://www.y-momo.jp/", "address": "", "notes": "以年輕素人為主題，但完全沒服務"},
  {"id": 84, "name": "台北", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "女孩穿著中華風打扮"},
  {"id": 85, "name": "羅馬來空底", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "同集團/姐妹店，質量服務參差不齊"},
  {"id": 86, "name": "基錄", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "同集團/姐妹店，質量服務參差不齊"},
  {"id": 87, "name": "First lady", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "同集團/姐妹店，質量服務參差不齊"},
  {"id": 88, "name": "妹店", "type": "激安店", "foreign": "—", "url": "", "address": "", "notes": "同集團/姐妹店，質量服務參差不齊"},
  {"id": 89, "name": "恵里亜(エリア)", "type": "激安店", "foreign": "❌ 不接待", "url": "https://y-eria.com/", "address": "", "notes": "皆為不接待外國人的店鋪"},
  {"id": 90, "name": "皇后天使", "type": "激安店", "foreign": "❌ 不接待", "url": "https://a-queen.net/", "address": "", "notes": "皆為不接待外國人的店鋪"},
  {"id": 91, "name": "alis", "type": "激安店", "foreign": "❌ 不接待", "url": "", "address": "", "notes": "皆為不接待外國人的店鋪"},
  {"id": 92, "name": "アクアパレス水宮", "type": "激安店", "foreign": "❌ 不接待", "url": "https://www.y-aqua.jp/", "address": "", "notes": "皆為不接待外國人的店鋪"},
  {"id": 93, "name": "MR DaddyP 2", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 94, "name": "Girl", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 95, "name": "下斯托瓦西山和我", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 96, "name": "Flem State", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 97, "name": "King", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 98, "name": "賽車皇后", "type": "激安店", "foreign": "⚠️ 不建議", "url": "https://www.y-queen.com/top/", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 99, "name": "韓塔", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 100, "name": "sweet kiss", "type": "激安店", "foreign": "⚠️ 不建議", "url": "https://www.sweet-k.com/", "address": "", "notes": "質量和服務參差不齊"},
  {"id": 101, "name": "Wasaki兔子", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 102, "name": "Gentlem", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 103, "name": "Happyess Tokyo", "type": "激安店", "foreign": "⚠️ 不建議", "url": "", "address": "", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店"},
  {"id": 104, "name": "三塔肥", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 105, "name": "卡酷", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 106, "name": "英國屋別管", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 107, "name": "魔", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 108, "name": "or club城俱", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 109, "name": "高普雷項目", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 110, "name": "阿尼卡魯美國拉隊", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "已歇業或關閉的店鋪"},
  {"id": 111, "name": "山普屋", "type": "已歇業/閉店", "foreign": "—", "url": "", "address": "", "notes": "歇業很久"},
  {"id": 112, "name": "戀念愛食", "type": "籌備中", "foreign": "—", "url": "", "address": "", "notes": "最近裝修升級，籌備中"},
];

// Global state
let allShops = [];
let filtered = [];
let currentSort = { key: 'id', asc: true };
let currentFilters = { type: '', foreign: '', search: '' };
let currentShopId = null;
let isAdmin = sessionStorage.getItem('yoshiwara_admin') === '1';

// 外國人接待的自訂排序權重 (數字越小排越前面)
const foreignSortWeight = {
  "✅ 接待": 1,
  "❌ 不接待": 3,
  "⚠️ 不建議": 2
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  loadShops();
  bindEvents();
  updateAdminUI(); // 初始化管理者 UI
  render();
});

// ---- Data ----
function loadShops() {
  let data = [...rawShopsData];
  
  // Merge with localStorage overrides
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const overrides = JSON.parse(saved);
      data = data.map(s => ({
        ...s,
        name: overrides[s.id]?.name ?? s.name,
        type: overrides[s.id]?.type ?? s.type,
        foreign: overrides[s.id]?.foreign ?? s.foreign,
        url: overrides[s.id]?.url ?? s.url,
        address: overrides[s.id]?.address ?? s.address,
        notes: overrides[s.id]?.notes ?? s.notes,
      }));
    } catch(e) { console.warn('localStorage parse error', e); }
  }
  
  allShops = data;
  filtered = [...allShops];
  render();
}

function saveOverrides(shop) {
  const saved = localStorage.getItem(STORAGE_KEY);
  const overrides = saved ? JSON.parse(saved) : {};
  overrides[shop.id] = {
    name: shop.name,
    url: shop.url,
    address: shop.address,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

// ---- Events ----
function bindEvents() {
  const filterType = document.getElementById('filter-type');
  const filterForeign = document.getElementById('filter-foreign');
  const searchName = document.getElementById('search-name');
  const sortBy = document.getElementById('sort-by');
  const sortDir = document.getElementById('sort-dir');

  filterType.addEventListener('change', () => {
    currentFilters.type = filterType.value;
    applyFilters();
  });
  filterForeign.addEventListener('change', () => {
    currentFilters.foreign = filterForeign.value;
    applyFilters();
  });
  searchName.addEventListener('input', () => {
    currentFilters.search = searchName.value.trim().toLowerCase();
    applyFilters();
  });
  sortBy.addEventListener('change', () => {
    currentSort.key = sortBy.value;
    applyFilters();
  });
  sortDir.addEventListener('click', () => {
    currentSort.asc = !currentSort.asc;
    sortDir.textContent = currentSort.asc ? '▲' : '▼';
    applyFilters();
  });

  // Th click for column sort
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
      } else {
        currentSort.key = key;
        currentSort.asc = true;
      }
      document.getElementById('sort-by').value = key;
      sortDir.textContent = currentSort.asc ? '▲' : '▼';
      applyFilters();
    });
  });

  // Modal backdrop close
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

  // Enter key in modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ---- Filter & Sort ----
function applyFilters() {
  filtered = allShops.filter(s => {
    if (currentFilters.type && s.type !== currentFilters.type) return false;
    if (currentFilters.foreign && s.foreign !== currentFilters.foreign) return false;
    if (currentFilters.search && !s.name.toLowerCase().includes(currentFilters.search)) return false;
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    let va = a[currentSort.key] ?? '';
    let vb = b[currentSort.key] ?? '';

    // 🌟 針對「接待外國人」套用特殊自訂權重排序邏輯
    if (currentSort.key === 'foreign') {
      let wa = foreignSortWeight[va] || 99; // 未定義或符號為 "—" 的排到最後面
      let wb = foreignSortWeight[vb] || 99;
      return currentSort.asc ? (wa - wb) : (wb - wa);
    }

    // 一般字串或數字排序邏輯
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return currentSort.asc ? -1 : 1;
    if (va > vb) return currentSort.asc ? 1 : -1;
    return 0;
  });

  renderTable();
  updateCount();
  updateSortIndicators();
}

function updateSortIndicators() {
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.sort === currentSort.key) {
      th.classList.add(currentSort.asc ? 'sort-asc' : 'sort-desc');
    }
  });
}

function updateCount() {
  const el = document.getElementById('result-count');
  const total = allShops.length;
  const shown = filtered.length;
  el.textContent = shown === total
    ? `共 ${total} 間店鋪`
    : `顯示 ${shown} / ${total} 間`;
}

// ---- Render ----
function render() {
  renderTable();
  updateCount();
}

function badgeClass(type) {
  if (type.includes('超高級')) return 'badge-super';
  if (type.includes('高級')) return 'badge-high';
  if (type.includes('大眾')) return 'badge-mid';
  if (type.includes('激安')) return 'badge-cheap';
  if (type.includes('閉店') || type.includes('歇業')) return 'badge-closed';
  if (type.includes('籌備')) return 'badge-prep';
  return 'badge-high';
}

function foreignClass(f) {
  if (f === '✅ 接待') return 'foreign-ok';
  if (f === '❌ 不接待') return 'foreign-no';
  if (f === '⚠️ 不建議') return 'foreign-avoid';
  return 'foreign-unknown';
}

function renderTable() {
  const tbody = document.getElementById('shop-tbody');
  const noResults = document.getElementById('no-results');

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  tbody.innerHTML = filtered.map(s => {
    const bc = badgeClass(s.type);
    const fc = foreignClass(s.foreign);
    const nameEsc = escapeHtml(s.name);
    return `<tr data-id="${s.id}">
      <td class="col-id">${s.id}</td>
      <td class="col-name">
        <span class="shop-name-link" onclick="openModal(${s.id})" title="點擊查看詳情">${nameEsc}</span>
      </td>
      <td class="col-type"><span class="badge ${bc}">${escapeHtml(s.type)}</span></td>
      <td class="col-foreign"><span class="${fc}">${s.foreign}</span></td>
      <td class="col-notes">${escapeHtml(s.notes)}</td>
    </tr>`;
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Modal ----
function openModal(id) {
  const s = allShops.find(x => x.id === id);
  if (!s) return;
  currentShopId = id;

  document.getElementById('modal-title').textContent = s.name;

  // 詳細檢視（所有人均可看）
  document.getElementById('detail-name').textContent = s.name;
  document.getElementById('detail-type').textContent = s.type;
  document.getElementById('detail-foreign').textContent = s.foreign;
  document.getElementById('detail-url').innerHTML = s.url
    ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="detail-link">${s.url}</a>`
    : '（無資料）';
  document.getElementById('detail-address').textContent = s.address || '（無資料）';
  document.getElementById('detail-notes').textContent = s.notes || '（無資料）';

  // 管理者才能看到編輯表單
  if (isAdmin) {
    document.getElementById('edit-name').value = s.name;
    document.getElementById('edit-type').value = s.type;
    document.getElementById('edit-foreign').value = s.foreign;
    document.getElementById('edit-url').value = s.url || '';
    document.getElementById('edit-address').value = s.address || '';
    document.getElementById('edit-notes').value = s.notes;
    document.getElementById('edit-panel').style.display = '';
    document.getElementById('modal-save-btn').style.display = '';
  } else {
    document.getElementById('edit-panel').style.display = 'none';
    document.getElementById('modal-save-btn').style.display = 'none';
  }

  document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('detail-modal').style.display = 'none';
  currentShopId = null;
}

function saveShop() {
  if (!currentShopId) return;
  const name = document.getElementById('edit-name').value.trim();
  const type = document.getElementById('edit-type').value;
  const foreign = document.getElementById('edit-foreign').value;
  const url = document.getElementById('edit-url').value.trim();
  const address = document.getElementById('edit-address').value.trim();
  const notes = document.getElementById('edit-notes').value.trim();

  const s = allShops.find(x => x.id === currentShopId);
  if (!s) return;

  s.name = name || s.name;
  s.type = type;
  s.foreign = foreign;
  s.url = url;
  s.address = address;
  s.notes = notes;

  saveOverrides(s);

  // Update localStorage saved name for display
  const saved = localStorage.getItem(STORAGE_KEY);
  const overrides = saved ? JSON.parse(saved) : {};
  overrides[s.id] = { name: s.name, type: s.type, foreign: s.foreign, url: s.url, address: s.address, notes: s.notes };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));

  // Re-apply filter/sort
  applyFilters();
  closeModal();
  showToast('✅ 已儲存');
}

// ---- Toast ----
function showToast(msg, isError = false) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ---- CSV Export / Import ----
function exportCSV() {
  const rows = [['id', 'name', 'type', 'foreign', 'url', 'address', 'notes']];
  allShops.forEach(s => {
    rows.push([
      s.id,
      s.name,
      s.type,
      s.foreign,
      s.url || '',
      s.address || '',
      (s.notes || '').replace(/\n/g, ' '),
    ]);
  });
  const csv = rows.map(r =>
    r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yoshiwara_backup_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ CSV 已匯出');
}

function importCSV(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const text = e.target.result;
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) { showToast('❌ CSV 格式錯誤', true); return; }
      const parseRow = line => {
        const result = [];
        let cur = '';
        let inQuote = false;
        for (let i = 0; i < line.length; i++) {
          const ch = line[i];
          if (ch === '"') {
            if (inQuote && line[i+1] === '"') { cur += '"'; i++; }
            else inQuote = !inQuote;
          } else if (ch === ',' && !inQuote) {
            result.push(cur.trim());
            cur = '';
          } else cur += ch;
        }
        result.push(cur.trim());
        return result;
      };
      parseRow(lines[0]); // header
      const data = {};
      for (let i = 1; i < lines.length; i++) {
        const cols = parseRow(lines[i]);
        if (cols.length < 2) continue;
        const id = parseInt(cols[0]);
        if (!id) continue;
        data[id] = {
          name: cols[1] || '',
          type: cols[2] || '',
          foreign: cols[3] || '',
          url: cols[4] || '',
          address: cols[5] || '',
          notes: (cols[6] || '').replace(/\\n/g, '\n'),
        };
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      const overrides = saved ? JSON.parse(saved) : {};
      Object.assign(overrides, data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
      location.reload();
    } catch(err) {
      console.error(err);
      showToast('❌ 匯入失敗：' + err.message, true);
    }
  };
  reader.readAsText(file, 'UTF-8');
  input.value = '';
}

// ---- Admin Auth ----
function showLogin() {
  const pw = prompt('請輸入管理者密碼：');
  if (!pw) return;
  if (pw === 'sex') {
    isAdmin = true;
    sessionStorage.setItem('yoshiwara_admin', '1');
    updateAdminUI();
    showToast('🔓 已進入管理模式');
  } else {
    showToast('❌ 密碼錯誤', true);
  }
}

function logout() {
  isAdmin = false;
  sessionStorage.removeItem('yoshiwara_admin');
  updateAdminUI();
  showToast('🔒 已登出');
}

function updateAdminUI() {
  const btn = document.getElementById('btn-admin');
  if (!btn) return;
  if (isAdmin) {
    btn.textContent = '🔒 登出';
    btn.onclick = logout;
    document.getElementById('edit-panel').style.display = '';
  } else {
    btn.textContent = '🔑 管理';
    btn.onclick = showLogin;
    document.getElementById('edit-panel').style.display = 'none';
  }
}
