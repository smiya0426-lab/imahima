import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AppContext'
import { useNotifications } from '../context/AppContext'
import UserAvatar from './UserAvatar'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, isLoggedIn, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <div className="navbar-inner container">
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="navbar-logo" id="nav-logo">
          <span className="logo-icon">🍻</span>
          <span className="logo-text">いまひま</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                id="nav-dashboard"
              >
                ダッシュボード
              </Link>
              <Link
                to="/events"
                className={`nav-link ${isActive('/events') ? 'active' : ''}`}
                id="nav-events"
              >
                イベント
              </Link>
              <Link
                to="/profile"
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                id="nav-profile"
              >
                プロフィール
              </Link>
              {/* Mobile-only links */}
              <Link to="/notifications" className="nav-link mobile-only" id="nav-notifications-mobile">
                🔔 通知 {unreadCount > 0 && `(${unreadCount})`}
              </Link>
              <Link to="/settings" className="nav-link mobile-only" id="nav-settings-mobile">
                ⚙️ 設定
              </Link>
              <button className="nav-link mobile-only logout-mobile" onClick={handleLogout}>
                🚪 ログアウト
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                id="nav-home"
              >
                ホーム
              </Link>
              <Link
                to="/events"
                className={`nav-link ${isActive('/events') ? 'active' : ''}`}
                id="nav-events"
              >
                イベント
              </Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <Link to="/create" className="btn btn-primary btn-nav" id="nav-create">
                <span>＋</span>
                イベント作成
              </Link>

              {/* Notification Bell */}
              <Link to="/notifications" className="nav-bell" id="nav-notifications">
                <span className="bell-icon">🔔</span>
                {unreadCount > 0 && (
                  <span className="bell-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="nav-user-dropdown" ref={dropdownRef}>
                <button
                  className="nav-user-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  id="nav-user-menu"
                >
                  <UserAvatar name={currentUser?.name} size="sm" />
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu animate-fade-in-down">
                    <div className="dropdown-header">
                      <UserAvatar name={currentUser?.name} size="md" />
                      <div>
                        <div className="dropdown-name">{currentUser?.name}</div>
                        <div className="dropdown-email">{currentUser?.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profile" className="dropdown-item" id="dropdown-profile">
                      <span>👤</span> プロフィール
                    </Link>
                    <Link to="/settings" className="dropdown-item" id="dropdown-settings">
                      <span>⚙️</span> 設定
                    </Link>
                    <Link to="/notifications" className="dropdown-item" id="dropdown-notifications">
                      <span>🔔</span> 通知
                      {unreadCount > 0 && <span className="dropdown-badge">{unreadCount}</span>}
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout} id="dropdown-logout">
                      <span>🚪</span> ログアウト
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-nav" id="nav-login">
                ログイン
              </Link>
              <Link to="/signup" className="btn btn-primary btn-nav" id="nav-signup">
                新規登録
              </Link>
            </>
          )}

          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
            id="hamburger-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
