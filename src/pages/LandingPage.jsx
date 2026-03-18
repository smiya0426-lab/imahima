import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import HeroSection from '../components/HeroSection'
import EventCard from '../components/EventCard'
import { MOCK_EVENTS } from '../data/mockData'
import './LandingPage.css'

export default function LandingPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const featuredEvents = MOCK_EVENTS.slice(0, 3)

  const features = [
    {
      emoji: '🔍',
      title: 'イベントを探す',
      description: 'エリア・カテゴリ・日時で、あなたにぴったりの飲みイベントを見つけよう。',
    },
    {
      emoji: '✨',
      title: 'イベントを作成',
      description: '自分で飲み会を企画して、メンバーを募集。少人数からOK！',
    },
    {
      emoji: '🤝',
      title: '新しい出会い',
      description: '共通の趣味を持つ飲み仲間と繋がろう。プロフィールで趣味をチェック。',
    },
  ]

  const steps = [
    { number: '01', title: 'アカウント作成', description: '30秒で簡単登録。プロフィールを充実させよう。' },
    { number: '02', title: 'イベントを探す', description: 'マップやカテゴリからお気に入りを見つけよう。' },
    { number: '03', title: '参加する', description: 'ワンタップで参加完了。当日を楽しみに待とう！' },
    { number: '04', title: '乾杯！', description: '新しい仲間と最高の一杯を。思い出を作ろう。' },
  ]

  return (
    <div className="landing-page" id="landing-page">
      <HeroSection />

      {/* Features */}
      <section className="section features-section" id="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">
              いまひまで<span className="text-gradient">できること</span>
            </h2>
            <p className="section-subtitle">
              飲み友探しをもっと簡単に、もっと楽しく。
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`feature-card glass-card animate-fade-in-up delay-${i + 1}`}
              >
                <div className="feature-emoji">{feature.emoji}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="section events-preview-section" id="events-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Popular</span>
            <h2 className="section-title">
              注目の<span className="text-gradient">イベント</span>
            </h2>
            <p className="section-subtitle">
              今週末の人気イベントをチェックしよう！
            </p>
          </div>

          <div className="events-preview-grid">
            {featuredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <div className="events-preview-cta">
            <Link to="/events" className="btn btn-secondary btn-lg" id="view-all-events">
              すべてのイベントを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how-section" id="how-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How it works</span>
            <h2 className="section-title">
              <span className="text-gradient">4ステップ</span>で始めよう
            </h2>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className={`step-card animate-fade-in-up delay-${i + 1}`}>
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section" id="cta-section">
        <div className="container">
          <div className="cta-card glass-card">
            <div className="cta-glow"></div>
            <h2 className="cta-title">
              今夜の一杯を、<span className="text-gradient">特別なものに。</span>
            </h2>
            <p className="cta-subtitle">
              いまひまで新しい飲み仲間を見つけよう。
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-lg" id="cta-get-started">
                🍻 無料で始める
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
