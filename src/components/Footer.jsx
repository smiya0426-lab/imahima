import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">🍻</span>
              <span className="logo-text text-gradient">いまひま</span>
            </Link>
            <p className="footer-tagline">
              今夜、誰かと飲みたいを叶えるプラットフォーム
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">サービス</h4>
              <Link to="/events" className="footer-link">イベントを探す</Link>
              <Link to="/create" className="footer-link">イベントを作成</Link>
              <Link to="/profile" className="footer-link">プロフィール</Link>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">サポート</h4>
              <a href="#" className="footer-link">利用規約</a>
              <a href="#" className="footer-link">プライバシーポリシー</a>
              <a href="#" className="footer-link">お問い合わせ</a>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">ソーシャル</h4>
              <a href="#" className="footer-link">Twitter / X</a>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">LINE</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 いまひま. All rights reserved.
          </p>
          <p className="footer-note">
            お酒は20歳になってから。飲酒運転は法律で禁止されています。
          </p>
        </div>
      </div>
    </footer>
  )
}
