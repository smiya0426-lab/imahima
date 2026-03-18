// Extra data for いまひま - Comments & Notifications

export const INITIAL_COMMENTS = [
  {
    id: 'c1',
    eventId: 'e1',
    userId: 'u5',
    userName: '伊藤健太',
    text: '前回参加してめちゃくちゃ楽しかったです！今回も楽しみ！',
    timestamp: '2026-03-18T15:30:00Z',
  },
  {
    id: 'c2',
    eventId: 'e1',
    userId: 'u6',
    userName: '渡辺あゆみ',
    text: 'IPAが飲めるお店ですか？ビター系が好きです🍺',
    timestamp: '2026-03-18T16:00:00Z',
  },
  {
    id: 'c3',
    eventId: 'e1',
    userId: 'u1',
    userName: '田中太郎',
    text: 'もちろん！IPA含め6タップくらいありますよ。お楽しみに！',
    timestamp: '2026-03-18T16:30:00Z',
  },
  {
    id: 'c4',
    eventId: 'e3',
    userId: 'u3',
    userName: '鈴木一郎',
    text: '思い出横丁のあのお店、最高でしたね！今回も行きたい',
    timestamp: '2026-03-17T20:00:00Z',
  },
  {
    id: 'c5',
    eventId: 'e3',
    userId: 'u8',
    userName: '中村さくら',
    text: '初参加です！よろしくお願いします😊',
    timestamp: '2026-03-18T10:00:00Z',
  },
  {
    id: 'c6',
    eventId: 'e2',
    userId: 'u4',
    userName: '高橋美咲',
    text: 'ソムリエさんがいるなんて贅沢！勉強になりそう',
    timestamp: '2026-03-18T12:00:00Z',
  },
  {
    id: 'c7',
    eventId: 'e5',
    userId: 'u7',
    userName: '山本大輝',
    text: '日本酒利き酒チャレンジ面白そう！全問正解目指します',
    timestamp: '2026-03-17T18:00:00Z',
  },
]

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'event_join',
    title: '新しい参加者',
    message: '渡辺あゆみさんが「渋谷クラフトビール飲み比べナイト」に参加しました',
    icon: '🎉',
    read: false,
    timestamp: '2026-03-18T16:00:00Z',
    link: '/events/e1',
  },
  {
    id: 'n2',
    type: 'comment',
    title: '新しいコメント',
    message: '伊藤健太さんが「渋谷クラフトビール飲み比べナイト」にコメントしました',
    icon: '💬',
    read: false,
    timestamp: '2026-03-18T15:30:00Z',
    link: '/events/e1',
  },
  {
    id: 'n3',
    type: 'reminder',
    title: 'イベントリマインダー',
    message: '「気軽に行こう！新宿横丁はしご酒」は明後日開催です！',
    icon: '⏰',
    read: false,
    timestamp: '2026-03-18T09:00:00Z',
    link: '/events/e3',
  },
  {
    id: 'n4',
    type: 'event_new',
    title: '新しいイベント',
    message: '恵比寿エリアで新しいワインイベントが作成されました',
    icon: '✨',
    read: true,
    timestamp: '2026-03-17T20:00:00Z',
    link: '/events/e2',
  },
  {
    id: 'n5',
    type: 'welcome',
    title: 'ようこそ！',
    message: 'いまひまへようこそ！プロフィールを充実させて飲み友を見つけましょう',
    icon: '🍻',
    read: true,
    timestamp: '2026-03-16T12:00:00Z',
    link: '/profile',
  },
]

// Format relative time
export function formatRelativeTime(timestamp) {
  const now = new Date()
  const date = new Date(timestamp)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'たった今'
  if (diffMins < 60) return `${diffMins}分前`
  if (diffHours < 24) return `${diffHours}時間前`
  if (diffDays < 7) return `${diffDays}日前`
  return `${date.getMonth() + 1}/${date.getDate()}`
}
