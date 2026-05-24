// ============================================
// 吉原泡泡浴名店指南 - App JS
// ============================================

const STORAGE_KEY = 'yoshiwara_shops_v1';

// 🌟 直接將 JSON 資料寫入陣列
const rawShopsData = [
  { "id": 1, "name": "西月", "type": "超高級店", "foreign": "❌ 不接待", "notes": "吉原三大名店之一，和式裝修，品質和服務極穩，安檢嚴格，黑服態度一般，不接待外國人", "url": "", "address": "" },
  { "id": 2, "name": "將軍", "type": "超高級店", "foreign": "—", "notes": "外觀平平無奇但價格昂貴（60分鐘入浴料需4萬9日元），完全預約制。老師招募極嚴格（排除抽菸、紋身、有疤痕及超過29歲的人）", "url": "", "address": "" },
  { "id": 3, "name": "老波頭愛之船", "type": "超高級店", "foreign": "—", "notes": "吉原三大名店之一，以尺度大著稱的老牌店鋪，主打服務，每天在線約10位", "url": "", "address": "" },
  { "id": 4, "name": "路民館", "type": "超高級店", "foreign": "—", "notes": "老師有分牌等級，吸收了原「翡翠之夢」閉店後的多數女孩，質量和服務穩定", "url": "", "address": "" },
  { "id": 5, "name": "某會員制名店", "type": "超高級店", "foreign": "❌ 不接待", "notes": "吉原三大名店之一，屬會員制，不接待外國人", "url": "", "address": "" },
  { "id": 6, "name": "翡翠之夢", "type": "超高級店", "foreign": "—", "notes": "曾是服務與顏值極頂的名店，已於二月底突然閉店", "url": "", "address": "" },
  { "id": 7, "name": "魯", "type": "高級店", "foreign": "✅ 接待", "notes": "對外國人服務非常好，無區別對待，強烈推薦", "url": "", "address": "" },
  { "id": 8, "name": "花園嘉路滴羅", "type": "高級店", "foreign": "✅ 接待", "notes": "對外國人友好，主打20-30代，每天約10位在線，服務與對日本人一致", "url": "", "address": "" },
  { "id": 9, "name": "Pepp Pino", "type": "高級店", "foreign": "—", "notes": "剛升級為高級店，女孩年輕可愛且照片無大差距，店員熱情禮貌，提供90分鐘起套餐", "url": "", "address": "" },
  { "id": 10, "name": "藍爵", "type": "高級店", "foreign": "—", "notes": "老牌高級店，服務和口味穩定，房間和浴缸較大，建議提前預約", "url": "", "address": "" },
  { "id": 11, "name": "魯瑟利努", "type": "高級店", "foreign": "⚠️ 不建議", "notes": "去年剛開，環境不錯且可做90分鐘，但出勤人數太少", "url": "", "address": "" },
  { "id": 12, "name": "法爾賽", "type": "高級店", "foreign": "❌ 不接待", "notes": "每天在線約30位，與尼宮共用老師，不接待外國人", "url": "", "address": "" },
  { "id": 13, "name": "尼宮", "type": "高級店", "foreign": "⚠️ 不建議", "notes": "主打30-40代熟女，每天在線約50位，外國人可進但服務無驚豔處且不便宜", "url": "", "address": "" },
  { "id": 14, "name": "秘書室", "type": "高級店", "foreign": "—", "notes": "老牌店鋪，主打辦公室OL風，外國人極難進，常被忽悠去服務縮水的姐妹店", "url": "", "address": "" },
  { "id": 15, "name": "Sular T", "type": "高級店", "foreign": "✅ 接待", "notes": "秘書室的姐妹店，外國人常被帶去，服務對外國人縮水，工作人員態度不佳", "url": "", "address": "" },
  { "id": 16, "name": "迎賓館", "type": "高級店", "foreign": "—", "notes": "早上6點就開門，但房間小、老師少，服務和質量不佳", "url": "", "address": "" },
  { "id": 17, "name": "白葉", "type": "高級店", "foreign": "—", "notes": "主打30-40代熟女，少見地提供60分鐘起套餐，入浴費（門票）需2萬日元，不含女孩費用", "url": "", "address": "" },
  { "id": 18, "name": "馬聽尼", "type": "高級店", "foreign": "✅ 接待", "notes": "價格略高於同級別，但整體質量和服務較為穩定，接待外國人", "url": "", "address": "" },
  { "id": 19, "name": "藍", "type": "高級店", "foreign": "❌ 不接待", "notes": "馬聽尼的姐妹店，質量與服務不如馬聽尼，不接待外國人", "url": "", "address": "" },
  { "id": 20, "name": "皇帝", "type": "高級店", "foreign": "✅ 接待", "notes": "主打服務，涵蓋各年齡段，對外國人中規中矩，每天在線約10位", "url": "", "address": "" },
  { "id": 21, "name": "阿普拉歌劇", "type": "高級店", "foreign": "⚠️ 不建議", "notes": "對外國人限制多、態度敷衍，有明顯區別對待", "url": "", "address": "" },
  { "id": 22, "name": "天了", "type": "高級店", "foreign": "—", "notes": "主打身材豐滿，有水床服務，但服務一般且態度敷衍", "url": "", "address": "" },
  { "id": 23, "name": "兔子俱樂部", "type": "高級店", "foreign": "—", "notes": "兔女郎主題，但服務普遍低於高級店正常水準", "url": "", "address": "" },
  { "id": 24, "name": "王氏", "type": "高級店", "foreign": "❌ 不接待", "notes": "歐式風格，高端大氣，但服務一般且不接外國人", "url": "", "address": "" },
  { "id": 25, "name": "紅法", "type": "高級店", "foreign": "⚠️ 不建議", "notes": "人氣雖高，但對外國人只有敷衍與區別對待，每天約30位", "url": "", "address": "" },
  { "id": 26, "name": "呂地", "type": "高級店", "foreign": "⚠️ 不建議", "notes": "老牌店鋪但服務下滑嚴重，對外國人服務一般", "url": "", "address": "" },
  { "id": 27, "name": "脆", "type": "高級店", "foreign": "❌ 不接待", "notes": "整體服務不錯，但不接待外國人", "url": "", "address": "" },
  { "id": 28, "name": "EXE", "type": "高級店", "foreign": "❌ 不接待", "notes": "顏值與資料很好，多為模特級別（頭牌夢二），不接待外國人", "url": "", "address": "" },
  { "id": 29, "name": "水色", "type": "高級店", "foreign": "—", "notes": "剛定位為高級店，但服務不好，素質和態度需提高", "url": "", "address": "" },
  { "id": 30, "name": "蔚藍海岸", "type": "高級店", "foreign": "—", "notes": "服務穩定，每天在線約20位", "url": "", "address": "" },
  { "id": 31, "name": "油肉丸", "type": "高級店", "foreign": "❌ 不接待", "notes": "品質較不錯，不接外國人，若會日語可去碰運氣", "url": "", "address": "" },
  { "id": 32, "name": "拉賓安樓玫瑰人生", "type": "高級店", "foreign": "—", "notes": "剛裝修升級，但服務一般", "url": "", "address": "" },
  { "id": 33, "name": "io", "type": "高級店", "foreign": "—", "notes": "硬體設施較好，但質量與服務還有待改進", "url": "", "address": "" },
  { "id": 34, "name": "盧宮", "type": "高級店", "foreign": "—", "notes": "西月的姐妹店，採陽式（西式）裝修，顏值和服務不錯", "url": "", "address": "" },
  { "id": 35, "name": "天空", "type": "高級店", "foreign": "❌ 不接待", "notes": "不接待外國人", "url": "", "address": "" },
  { "id": 36, "name": "羅佩他", "type": "高級店", "foreign": "❌ 不接待", "notes": "不接待外國人", "url": "", "address": "" },
  { "id": 37, "name": "波", "type": "高級店", "foreign": "❌ 不接待", "notes": "不接待外國人", "url": "", "address": "" },
  { "id": 38, "name": "吉原巧克力", "type": "高級店", "foreign": "❌ 不接待", "notes": "不接待外國人", "url": "", "address": "" },
  { "id": 39, "name": "必所", "type": "高級店", "foreign": "❌ 不接待", "notes": "不接待外國人", "url": "", "address": "" },
  { "id": 40, "name": "Golden Blue", "type": "高級店", "foreign": "—", "notes": "服務一般或在線人數不多", "url": "", "address": "" },
  { "id": 41, "name": "OTO", "type": "高級店", "foreign": "—", "notes": "服務一般或在線人數不多", "url": "", "address": "" },
  { "id": 42, "name": "來子Club", "type": "高級店", "foreign": "—", "notes": "服務一般或在線人數不多", "url": "", "address": "" },
  { "id": 43, "name": "Academy", "type": "高級店", "foreign": "—", "notes": "服務一般或在線人數不多", "url": "", "address": "" },
  { "id": 44, "name": "神旅的店", "type": "高級店", "foreign": "—", "notes": "服務一般或在線人數不多", "url": "", "address": "" },
  { "id": 45, "name": "黑色法爾賽", "type": "高級店", "foreign": "—", "notes": "籌備中（福岡法爾賽姐妹店）", "url": "", "address": "" },
  { "id": 46, "name": "Princess Miss", "type": "大眾店", "foreign": "✅ 接待", "notes": "提供許多高級店沒有的水床服務，每天約10位，接待外國人", "url": "", "address": "" },
  { "id": 47, "name": "Dent Club", "type": "大眾店", "foreign": "❌ 不接待", "notes": "主打40-60代超級熟女，進店前需有心理準備", "url": "", "address": "" },
  { "id": 48, "name": "Plant House", "type": "大眾店", "foreign": "❌ 不接待", "notes": "主打40-60代超級熟女，進店前需有心理準備", "url": "", "address": "" },
  { "id": 49, "name": "小偷 ad", "type": "大眾店", "foreign": "—", "notes": "皆為主打30-40代以上的熟女店鋪，服務層次不齊", "url": "", "address": "" },
  { "id": 50, "name": "貴公子", "type": "大眾店", "foreign": "—", "notes": "皆為主打30-40代以上的熟女店鋪，服務層次不齊", "url": "", "address": "" },
  { "id": 51, "name": "declection 地", "type": "大眾店", "foreign": "—", "notes": "皆為主打30-40代以上的熟女店鋪，服務層次不齊", "url": "", "address": "" },
  { "id": 52, "name": "Anis Coffee", "type": "大眾店", "foreign": "✅ 接待", "notes": "Cosplay風格的店鋪，品質一般，對外國人收費極高", "url": "", "address": "" },
  { "id": 53, "name": "CPA", "type": "大眾店", "foreign": "✅ 接待", "notes": "Cosplay風格的店鋪，品質一般，對外國人收費極高", "url": "", "address": "" },
  { "id": 54, "name": "鋪著", "type": "大眾店", "foreign": "✅ 接待", "notes": "Cosplay風格的店鋪，品質一般，對外國人收費極高", "url": "", "address": "" },
  { "id": 55, "name": "馬西姆", "type": "大眾店", "foreign": "—", "notes": "「人造」差距特別嚴重", "url": "", "address": "" },
  { "id": 56, "name": "阿雲", "type": "大眾店", "foreign": "—", "notes": "「人造」差距特別嚴重", "url": "", "address": "" },
  { "id": 57, "name": "華", "type": "大眾店", "foreign": "—", "notes": "「人造」差距特別嚴重", "url": "", "address": "" },
  { "id": 58, "name": "Select COT", "type": "大眾店", "foreign": "—", "notes": "房間太小放不下水床，無水床服務", "url": "", "address": "" },
  { "id": 59, "name": "卡拉富魯布", "type": "大眾店", "foreign": "—", "notes": "女孩年輕但沒服務，主打浪費時間與金錢", "url": "", "address": "" },
  { "id": 60, "name": "SAKS 帕櫻花", "type": "大眾店", "foreign": "—", "notes": "泡泡浴加SPA流程，設施較舊，無水床服務", "url": "", "address": "" },
  { "id": 61, "name": "美女革命", "type": "大眾店", "foreign": "❌ 不接待", "notes": "名字唬人或品質一般，皆不接待外國人", "url": "", "address": "" },
  { "id": 62, "name": "M路", "type": "大眾店", "foreign": "❌ 不接待", "notes": "名字唬人或品質一般，皆不接待外國人", "url": "", "address": "" },
  { "id": 63, "name": "Newsky", "type": "大眾店", "foreign": "❌ 不接待", "notes": "名字唬人或品質一般，皆不接待外國人", "url": "", "address": "" },
  { "id": 64, "name": "安完風", "type": "大眾店", "foreign": "❌ 不接待", "notes": "名字唬人或品質一般，皆不接待外國人", "url": "", "address": "" },
  { "id": 65, "name": "贏馬車", "type": "大眾店", "foreign": "✅ 接待", "notes": "質量服務一般，或對外國人價格高，體驗非常差", "url": "", "address": "" },
  { "id": 66, "name": "多念人俱樂部", "type": "大眾店", "foreign": "✅ 接待", "notes": "質量服務一般，或對外國人價格高，體驗非常差", "url": "", "address": "" },
  { "id": 67, "name": "哈魯布魯", "type": "大眾店", "foreign": "✅ 接待", "notes": "質量服務一般，或對外國人價格高，體驗非常差", "url": "", "address": "" },
  { "id": 68, "name": "For四G", "type": "大眾店", "foreign": "✅ 接待", "notes": "質量服務一般，或對外國人價格高，體驗非常差", "url": "", "address": "" },
  { "id": 69, "name": "比革們大個子", "type": "大眾店", "foreign": "✅ 接待", "notes": "質量服務一般，或對外國人價格高，體驗非常差", "url": "", "address": "" },
  { "id": 70, "name": "歐西斯", "type": "大眾店", "foreign": "✅ 接待", "notes": "質量服務一般，或對外國人價格高，體驗非常差", "url": "", "address": "" },
  { "id": 71, "name": "NGLIC", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "NGL集團旗艦店，主打簡單粗暴，無服務，極不建議前往", "url": "", "address": "" },
  { "id": 72, "name": "咖貝魯", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "主打時尚辣妹風格，對外國人無驚豔處且價格不便宜", "url": "", "address": "" },
  { "id": 73, "name": "三", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差", "url": "", "address": "" },
  { "id": 74, "name": "媽是太路", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差", "url": "", "address": "" },
  { "id": 75, "name": "普動了", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差", "url": "", "address": "" },
  { "id": 76, "name": "金瓶梅", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差", "url": "", "address": "" },
  { "id": 77, "name": "卡酷拉玉店", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差", "url": "", "address": "" },
  { "id": 78, "name": "CL夢", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "極易踩雷！充斥著照片嚴重不符，服務態度極差", "url": "", "address": "" },
  { "id": 79, "name": "火箭妻子", "type": "激安店", "foreign": "—", "notes": "主打30-40代熟女，貨不對板情況嚴重", "url": "", "address": "" },
  { "id": 80, "name": "W外", "type": "激安店", "foreign": "—", "notes": "主打30-40代熟女，貨不對板情況嚴重", "url": "", "address": "" },
  { "id": 81, "name": "埃多魯偶像研究生", "type": "激安店", "foreign": "—", "notes": "主打JK學院風格，女孩年輕但服務一般，外國人料金非常高", "url": "", "address": "" },
  { "id": 82, "name": "多了錢", "type": "激安店", "foreign": "—", "notes": "主打JK學院風格，女孩年輕但服務一般，外國人料金非常高", "url": "", "address": "" },
  { "id": 83, "name": "Mo", "type": "激安店", "foreign": "—", "notes": "以年輕素人為主題，但完全沒服務", "url": "", "address": "" },
  { "id": 84, "name": "台北", "type": "激安店", "foreign": "—", "notes": "女孩穿著中華風打扮", "url": "", "address": "" },
  { "id": 85, "name": "羅馬來空底", "type": "激安店", "foreign": "—", "notes": "同集團/姐妹店，質量服務參差不齊", "url": "", "address": "" },
  { "id": 86, "name": "基錄", "type": "激安店", "foreign": "—", "notes": "同集團/姐妹店，質量服務參差不齊", "url": "", "address": "" },
  { "id": 87, "name": "First lady", "type": "激安店", "foreign": "—", "notes": "同集團/姐妹店，質量服務參差不齊", "url": "", "address": "" },
  { "id": 88, "name": "妹店", "type": "激安店", "foreign": "—", "notes": "同集團/姐妹店，質量服務參差不齊", "url": "", "address": "" },
  { "id": 89, "name": "會你", "type": "激安店", "foreign": "❌ 不接待", "notes": "皆為不接待外國人的店鋪", "url": "", "address": "" },
  { "id": 90, "name": "NG環后", "type": "激安店", "foreign": "❌ 不接待", "notes": "皆為不接待外國人的店鋪", "url": "", "address": "" },
  { "id": 91, "name": "alis", "type": "激安店", "foreign": "❌ 不接待", "notes": "皆為不接待外國人的店鋪", "url": "", "address": "" },
  { "id": 92, "name": "哈尼c帕", "type": "激安店", "foreign": "❌ 不接待", "notes": "皆為不接待外國人的店鋪", "url": "", "address": "" },
  { "id": 93, "name": "MR DaddyP 2", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 94, "name": "Girl", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 95, "name": "下斯托瓦西山和我", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 96, "name": "Flem State", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 97, "name": "King", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 98, "name": "賽車皇后", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 99, "name": "韓塔", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 100, "name": "caseiss等", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 101, "name": "Wasaki兔子", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 102, "name": "Gentlem", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 103, "name": "Happyess Tokyo", "type": "激安店", "foreign": "⚠️ 不建議", "notes": "皆為品質差、服務拉垮或在線人數極少的激安店", "url": "", "address": "" },
  { "id": 104, "name": "三塔肥", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 105, "name": "卡酷", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 106, "name": "英國屋別管", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 107, "name": "魔", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 108, "name": "or club城俱", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 109, "name": "高普雷項目", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 110, "name": "阿尼卡魯美國拉隊", "type": "已歇業/閉店", "foreign": "—", "notes": "已歇業或關閉的店鋪", "url": "", "address": "" },
  { "id": 111, "name": "山普屋", "type": "已歇業/閉店", "foreign": "—", "notes": "歇業很久", "url": "", "address": "" },
  { "id": 112, "name": "戀念愛食", "type": "籌備中", "foreign": "—", "notes": "最近裝修升級，籌備中", "url": "", "address": "" }
];

// Global state
let allShops = [];
let filtered = [];
let currentSort = { key: 'id', asc: true };
let currentFilters = { type: '', foreign: '', search: '' };
let currentShopId = null;

// 外國人接待的排序權重 (數字越小排越前面)
const foreignSortWeight = {
  "✅ 接待": 1,
  "❌ 不接待": 2,
  "⚠️ 不建議": 3
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  loadShops();
  bindEvents();
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

    // 🌟 針對「接待外國人」加入權重排序邏輯
    if (currentSort.key === 'foreign') {
      let wa = foreignSortWeight[va] || 99; // 未定義的值放最後
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
  document.getElementById('edit-name').value = s.name;
  document.getElementById('edit-type').value = s.type;
  document.getElementById('edit-foreign').value = s.foreign;
  document.getElementById('edit-url').value = s.url || '';
  document.getElementById('edit-address').value = s.address || '';
  document.getElementById('edit-notes').value = s.notes;

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
