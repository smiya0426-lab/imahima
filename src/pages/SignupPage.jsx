import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import './AuthPage.css'

const INTEREST_OPTIONS = [
  'ビール', 'クラフトビール', 'ワイン', '日本酒', '焼酎',
  'ウイスキー', 'カクテル', 'テキーラ', 'ラム', 'ハイボール',
  '居酒屋', 'バー', '立ち飲み', 'はしご酒', '女子会',
  'オンライン飲み', '料理', 'チーズ', '焼肉', 'カラオケ',
]

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoggedIn } = useAuth()
  const toast = useToast()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    bio: '',
    interests: [],
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  if (isLoggedIn) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleStep1 = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('パスワードが一致しません')
      return
    }
    if (form.password.length < 4) {
      setError('パスワードは4文字以上で入力してください')
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await new Promise(r => setTimeout(r, 800))

    const result = signup({
      name: form.name,
      email: form.email,
      age: form.age ? parseInt(form.age) : 25,
      bio: form.bio,
      interests: form.interests,
    })

    setLoading(false)

    if (result.success) {
      toast.success('アカウントを作成しました！ようこそいまひまへ 🍻')
      navigate('/dashboard')
    }
  }

  return (
    <div className="auth-page" id="signup-page">
      <div className="auth-bg">
        <div className="auth-glow auth-glow-1"></div>
        <div className="auth-glow auth-glow-2"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card glass-card animate-scale-in" style={{ maxWidth: step === 2 ? '560px' : undefined }}>
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span className="logo-icon">🍻</span>
              <span className="logo-text text-gradient">いまひま</span>
            </Link>
            <h1 className="auth-title">新規登録</h1>
            <p className="auth-subtitle">
              {step === 1 ? 'アカウントを作成して飲み仲間を見つけよう' : 'あなたのことを教えてください'}
            </p>

            {/* Step indicator */}
            <div className="auth-steps">
              <div className={`auth-step ${step >= 1 ? 'active' : ''}`}>
                <span className="auth-step-num">1</span>
                <span className="auth-step-label">アカウント情報</span>
              </div>
              <div className="auth-step-line"></div>
              <div className={`auth-step ${step >= 2 ? 'active' : ''}`}>
                <span className="auth-step-num">2</span>
                <span className="auth-step-label">プロフィール</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="auth-error animate-fade-in">
              <span>⚠️</span> {error}
            </div>
          )}

          {step === 1 ? (
            <form className="auth-form" onSubmit={handleStep1}>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-name">お名前</label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  className="input-field"
                  placeholder="表示名を入力"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="signup-email">メールアドレス</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  className="input-field"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row-auth">
                <div className="form-group">
                  <label className="form-label" htmlFor="signup-password">パスワード</label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    className="input-field"
                    placeholder="4文字以上"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={4}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="signup-confirm">パスワード確認</label>
                  <input
                    type="password"
                    id="signup-confirm"
                    name="confirmPassword"
                    className="input-field"
                    placeholder="もう一度入力"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg auth-submit" id="signup-next">
                次へ →
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row-auth">
                <div className="form-group">
                  <label className="form-label" htmlFor="signup-age">年齢</label>
                  <input
                    type="number"
                    id="signup-age"
                    name="age"
                    className="input-field"
                    placeholder="20"
                    min="20"
                    max="99"
                    value={form.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="signup-bio">自己紹介</label>
                <textarea
                  id="signup-bio"
                  name="bio"
                  className="input-field"
                  placeholder="好きなお酒や趣味を書いてみましょう"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">興味のあるジャンル（複数選択可）</label>
                <div className="interest-grid">
                  {INTEREST_OPTIONS.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      className={`interest-chip ${form.interests.includes(interest) ? 'selected' : ''}`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="auth-form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  ← 戻る
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg auth-submit ${loading ? 'loading' : ''}`}
                  disabled={loading}
                  id="signup-submit"
                >
                  {loading ? <span className="spinner"></span> : '🍻 登録する'}
                </button>
              </div>
            </form>
          )}

          <div className="auth-footer">
            <p>
              すでにアカウントをお持ちの方は{' '}
              <Link to="/login" className="auth-link">ログイン</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
