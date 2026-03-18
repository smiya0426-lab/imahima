import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import './AuthPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isLoggedIn) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    await new Promise(r => setTimeout(r, 600))

    const result = login(email, password)
    setLoading(false)

    if (result.success) {
      toast.success('ログインしました！🍻')
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  const handleDemoLogin = () => {
    setEmail('tanaka@demo.com')
    setPassword('demo')
    const result = login('tanaka@demo.com', 'demo')
    if (result.success) {
      toast.success('デモアカウントでログインしました！🍻')
      navigate('/dashboard')
    }
  }

  return (
    <div className="auth-page" id="login-page">
      <div className="auth-bg">
        <div className="auth-glow auth-glow-1"></div>
        <div className="auth-glow auth-glow-2"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card glass-card animate-scale-in">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span className="logo-icon">🍻</span>
              <span className="logo-text text-gradient">いまひま</span>
            </Link>
            <h1 className="auth-title">おかえりなさい！</h1>
            <p className="auth-subtitle">ログインして飲み仲間を見つけよう</p>
          </div>

          {error && (
            <div className="auth-error animate-fade-in">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">メールアドレス</label>
              <input
                type="email"
                id="login-email"
                className="input-field"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">パスワード</label>
              <input
                type="password"
                id="login-password"
                className="input-field"
                placeholder="パスワードを入力"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={4}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-lg auth-submit ${loading ? 'loading' : ''}`}
              disabled={loading}
              id="login-submit"
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'ログイン'
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>または</span>
          </div>

          <button
            className="btn btn-secondary btn-lg auth-demo-btn"
            onClick={handleDemoLogin}
            id="demo-login"
          >
            🍺 デモアカウントで体験
          </button>

          <div className="auth-footer">
            <p>
              アカウントをお持ちでない方は{' '}
              <Link to="/signup" className="auth-link">新規登録</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
