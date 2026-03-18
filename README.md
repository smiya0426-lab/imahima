# いまひま 🍻

**「今暇？飲みに行かない？」** を叶える飲み友マッチングプラットフォーム

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?logo=javascript&logoColor=black)

## 🎯 概要

「いまひま」は、近くで一緒に飲める人を探すためのイベントマッチングWebアプリです。
イベントの作成・参加・コメント・通知など、SNS的な機能を備えたフルスタック風SPAです。

## ✨ 主な機能

| 機能 | 説明 |
|------|------|
| 🔐 認証 | ログイン / サインアップ / デモアカウント |
| 📊 ダッシュボード | 参加予定・おすすめイベント・統計・通知 |
| 📅 イベント管理 | 作成・参加・離脱・削除・カテゴリ検索 |
| 💬 コメント | テキスト + 画像添付・削除 |
| 🔔 通知 | リアルタイム通知ベル・既読管理 |
| 👤 プロフィール | アバター画像アップロード・編集 |
| ⚙️ 設定 | 通知トグル・データ管理 |

## 🛠️ 技術スタック

- **フレームワーク**: React 19 + Vite 6
- **ルーティング**: React Router DOM v7
- **状態管理**: React Context API + localStorage永続化
- **スタイリング**: Vanilla CSS（カスタムプロパティによるデザインシステム）
- **画像処理**: FileReader API（base64変換）

## 🚀 セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build
```

## 📁 ディレクトリ構成

```
src/
├── components/       # 再利用可能なUIコンポーネント
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── EventCard.jsx
│   ├── UserAvatar.jsx
│   └── CommentSection.jsx
├── context/          # グローバル状態管理
│   ├── AppContext.jsx    # Auth / Events / Notifications
│   └── ToastContext.jsx  # トースト通知
├── data/             # モックデータ
│   ├── mockData.js
│   └── extraData.js
├── pages/            # ページコンポーネント
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── EventsPage.jsx
│   ├── EventDetailPage.jsx
│   ├── CreateEventPage.jsx
│   ├── ProfilePage.jsx
│   ├── SettingsPage.jsx
│   └── NotificationsPage.jsx
├── App.jsx
├── main.jsx
└── index.css         # デザインシステム
```

## 📸 スクリーンショット

> デモアカウントでログインして全機能をお試しいただけます。

## 🎨 デザイン

- **カラースキーム**: スカイブルー基調のライトテーマ
- **レスポンシブ**: モバイル / タブレット / デスクトップ対応
- **アニメーション**: フェードイン・スケールイン等のマイクロアニメーション
- **グラスモーフィズム**: 半透明カード + ブラー効果

## 📝 ライセンス

MIT
