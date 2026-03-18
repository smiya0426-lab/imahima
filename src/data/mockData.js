// Mock Data for いまひま

export const CATEGORIES = [
  { id: 'all', label: 'すべて', emoji: '🍻' },
  { id: 'izakaya', label: '居酒屋', emoji: '🏮' },
  { id: 'bar', label: 'バー', emoji: '🍸' },
  { id: 'wine', label: 'ワイン会', emoji: '🍷' },
  { id: 'craft-beer', label: 'クラフトビール', emoji: '🍺' },
  { id: 'casual', label: 'カジュアル飲み', emoji: '🥂' },
  { id: 'standing', label: '立ち飲み', emoji: '🍶' },
  { id: 'online', label: 'オンライン飲み', emoji: '💻' },
]

export const AREAS = [
  '渋谷', '新宿', '池袋', '六本木', '恵比寿',
  '銀座', '上野', '浅草', '中目黒', '下北沢',
  '横浜', '大阪・梅田', '名古屋・栄', '福岡・天神', 'オンライン',
]

export const MOCK_USERS = [
  { id: 'u1', name: '田中太郎', email: 'tanaka@demo.com', age: 28, bio: 'クラフトビール好き。週末はいつも新しいお店を開拓中！', avatar: null, interests: ['クラフトビール', 'IPA', 'ブルワリー巡り'] },
  { id: 'u2', name: '佐藤花子', email: 'sato@demo.com', age: 25, bio: 'ワイン初心者だけど大好き。おしゃれなバーに行きたい！', avatar: null, interests: ['ワイン', 'チーズ', 'イタリアン'] },
  { id: 'u3', name: '鈴木一郎', email: 'suzuki@demo.com', age: 32, bio: '日本酒ソムリエ目指して勉強中。一緒に飲みながら語りましょう！', avatar: null, interests: ['日本酒', '焼酎', '和食'] },
  { id: 'u4', name: '高橋美咲', email: 'takahashi@demo.com', age: 27, bio: 'カクテル作りが趣味です。お酒の話で盛り上がりましょう♪', avatar: null, interests: ['カクテル', 'ミクソロジー', 'バー巡り'] },
  { id: 'u5', name: '伊藤健太', email: 'ito@demo.com', age: 30, bio: '仕事帰りにサクッと飲める仲間募集中！', avatar: null, interests: ['ビール', '居酒屋', '焼肉'] },
  { id: 'u6', name: '渡辺あゆみ', email: 'watanabe@demo.com', age: 24, bio: '地方から上京したばかり。飲み友達が欲しい！', avatar: null, interests: ['ハイボール', 'もつ鍋', 'カラオケ'] },
  { id: 'u7', name: '山本大輝', email: 'yamamoto@demo.com', age: 35, bio: 'ウイスキー愛好家。スコッチからジャパニーズまで。', avatar: null, interests: ['ウイスキー', 'シングルモルト', 'バー'] },
  { id: 'u8', name: '中村さくら', email: 'nakamura@demo.com', age: 26, bio: '海外のお酒に興味あり。いろんなお酒を飲み比べたい！', avatar: null, interests: ['テキーラ', 'ラム', '海外ビール'] },
]

export const MOCK_EVENTS = [
  {
    id: 'e1',
    title: '🍺 渋谷クラフトビール飲み比べナイト',
    description: '渋谷のクラフトビール専門店で、国内外のクラフトビールを飲み比べましょう！ビール初心者もベテランも大歓迎。店長おすすめの限定タップも楽しめます。',
    category: 'craft-beer',
    area: '渋谷',
    venue: 'Craft Beer Market 渋谷店',
    date: '2026-03-21',
    time: '19:00',
    maxParticipants: 8,
    participants: ['u1', 'u5', 'u6'],
    host: 'u1',
    price: '3,500円〜',
    image: null,
    tags: ['ビール', '飲み比べ', '初心者歓迎'],
  },
  {
    id: 'e2',
    title: '🍷 金曜ワインナイト in 恵比寿',
    description: 'おしゃれなワインバーで、ソムリエ厳選のワインを楽しむ会。フランス、イタリア、日本のワインをテーマに語り合いましょう。チーズプレート付き！',
    category: 'wine',
    area: '恵比寿',
    venue: 'Wine & Cheese Terrace',
    date: '2026-03-22',
    time: '19:30',
    maxParticipants: 6,
    participants: ['u2', 'u4'],
    host: 'u2',
    price: '4,000円〜',
    image: null,
    tags: ['ワイン', 'ソムリエ', 'チーズ'],
  },
  {
    id: 'e3',
    title: '🏮 気軽に行こう！新宿横丁はしご酒',
    description: '新宿の横丁で思い出横丁から歌舞伎町横丁まではしご酒！各店1杯ずつ飲みながら、わいわい楽しく回りましょう。',
    category: 'izakaya',
    area: '新宿',
    venue: '思い出横丁 集合',
    date: '2026-03-20',
    time: '18:30',
    maxParticipants: 10,
    participants: ['u5', 'u6', 'u3', 'u8'],
    host: 'u5',
    price: '2,000円〜',
    image: null,
    tags: ['はしご酒', '横丁', 'わいわい'],
  },
  {
    id: 'e4',
    title: '🍸 大人のカクテルバー体験',
    description: 'プロのバーテンダーがカクテルの作り方を教えてくれる特別な夜。自分だけのオリジナルカクテルも作れます！',
    category: 'bar',
    area: '銀座',
    venue: 'Bar GINZA Premium',
    date: '2026-03-25',
    time: '20:00',
    maxParticipants: 5,
    participants: ['u4'],
    host: 'u4',
    price: '5,000円〜',
    image: null,
    tags: ['カクテル', 'バーテンダー', '体験'],
  },
  {
    id: 'e5',
    title: '🍶 日本酒利き酒チャレンジ',
    description: '全国から厳選した日本酒10種を飲み比べ！銘柄を当てる利き酒チャレンジもあり。日本酒の奥深さを一緒に楽しみましょう。',
    category: 'izakaya',
    area: '上野',
    venue: '酒蔵 上野店',
    date: '2026-03-23',
    time: '18:00',
    maxParticipants: 8,
    participants: ['u3', 'u7', 'u1'],
    host: 'u3',
    price: '3,000円〜',
    image: null,
    tags: ['日本酒', '利き酒', 'チャレンジ'],
  },
  {
    id: 'e6',
    title: '💻 オンライン飲み会 〜全国の地ビール紹介〜',
    description: 'オンラインで全国の地ビールを紹介し合う飲み会！事前に各自お気に入りのビールを用意して、画面越しに乾杯しましょう。',
    category: 'online',
    area: 'オンライン',
    venue: 'Zoom',
    date: '2026-03-24',
    time: '20:00',
    maxParticipants: 15,
    participants: ['u1', 'u8'],
    host: 'u8',
    price: '各自負担',
    image: null,
    tags: ['オンライン', '地ビール', '全国'],
  },
  {
    id: 'e7',
    title: '🥂 女子会カジュアル飲み in 中目黒',
    description: 'おしゃれなカフェバーで女子だけのカジュアル飲み会。スパークリングワインで乾杯！SNS映えフードも楽しめます。',
    category: 'casual',
    area: '中目黒',
    venue: 'Café & Bar NAKAME',
    date: '2026-03-26',
    time: '19:00',
    maxParticipants: 6,
    participants: ['u2', 'u6', 'u4', 'u8'],
    host: 'u6',
    price: '3,000円〜',
    image: null,
    tags: ['女子会', 'カジュアル', 'おしゃれ'],
  },
  {
    id: 'e8',
    title: '🍺 立ち飲みツアー in 上野〜御徒町',
    description: 'ディープな立ち飲み屋を巡る酔っ払いツアー！1軒500円以下で楽しめるコスパ最強のお店を厳選。',
    category: 'standing',
    area: '上野',
    venue: 'アメ横ガード下 集合',
    date: '2026-03-27',
    time: '17:00',
    maxParticipants: 8,
    participants: ['u5', 'u3'],
    host: 'u5',
    price: '1,500円〜',
    image: null,
    tags: ['立ち飲み', 'コスパ', 'ディープ'],
  },
  {
    id: 'e9',
    title: '🍸 ウイスキー初心者の会',
    description: 'ウイスキーに興味はあるけど何から始めればいいかわからない人向け。基本的な飲み方から銘柄の選び方まで、ウイスキー歴10年の主催者が丁寧にガイドします。',
    category: 'bar',
    area: '六本木',
    venue: 'Whisky House Roppongi',
    date: '2026-03-28',
    time: '19:30',
    maxParticipants: 6,
    participants: ['u7'],
    host: 'u7',
    price: '4,500円〜',
    image: null,
    tags: ['ウイスキー', '初心者', 'ガイド付き'],
  },
  {
    id: 'e10',
    title: '🏮 昭和レトロ酒場めぐり in 浅草',
    description: '浅草の昭和レトロな酒場を巡る特別な夜。ホッピー通りからディープな路地裏まで、タイムスリップしたような雰囲気を楽しみましょう。',
    category: 'izakaya',
    area: '浅草',
    venue: 'ホッピー通り入口 集合',
    date: '2026-03-29',
    time: '17:30',
    maxParticipants: 8,
    participants: ['u3', 'u5', 'u6', 'u1', 'u8'],
    host: 'u3',
    price: '2,500円〜',
    image: null,
    tags: ['レトロ', '昭和', 'はしご酒'],
  },
]

// Helper to get user by ID
export function getUserById(id) {
  return MOCK_USERS.find(u => u.id === id)
}

// Helper to get event by ID
export function getEventById(id) {
  return MOCK_EVENTS.find(e => e.id === id)
}

// Helper to get category info
export function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id)
}

// Helper to format date
export function formatDate(dateStr) {
  const date = new Date(dateStr)
  const days = ['日', '月', '火', '水', '木', '金', '土']
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = days[date.getDay()]
  return `${month}/${day}（${dayOfWeek}）`
}

// Helper to check if event is full
export function isEventFull(event) {
  return event.participants.length >= event.maxParticipants
}

// Helper to get remaining spots
export function getRemainingSpots(event) {
  return event.maxParticipants - event.participants.length
}
