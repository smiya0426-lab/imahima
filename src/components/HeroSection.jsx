import { Link } from 'react-router-dom'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero" id="hero-section">
      {/* Background Decorations */}
      <div className="hero-bg">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-glow hero-glow-3"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>
      </div>

      <div className="hero-content container">
        <div className="hero-badge animate-fade-in-down">
          <span className="hero-badge-dot"></span>
          新しい飲み仲間が見つかるプラットフォーム
        </div>

        <h1 className="hero-title animate-fade-in-up delay-1">
          今夜、<span className="text-gradient">誰かと飲みたい</span>
          <br />
          を叶えよう。
        </h1>

        <p className="hero-subtitle animate-fade-in-up delay-2">
          いまひまは、あなたの「一杯」を特別な体験に変える飲み友マッチングプラットフォーム。
          <br className="hide-mobile" />
          近くのイベントに参加したり、自分で募集を作って、新しい出会いを楽しもう。
        </p>

        <div className="hero-actions animate-fade-in-up delay-3">
          <Link to="/events" className="btn btn-primary btn-lg" id="hero-find-events">
            🍻 イベントを探す
          </Link>
          <Link to="/create" className="btn btn-secondary btn-lg" id="hero-create-event">
            イベントを作成
          </Link>
        </div>

        <div className="hero-stats animate-fade-in-up delay-4">
          <div className="hero-stat">
            <span className="hero-stat-number">1,200+</span>
            <span className="hero-stat-label">アクティブユーザー</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">350+</span>
            <span className="hero-stat-label">今月のイベント</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">98%</span>
            <span className="hero-stat-label">満足度</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator animate-fade-in delay-5">
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
