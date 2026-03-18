import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, useEvents } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import UserAvatar from '../components/UserAvatar'
import EventCard from '../components/EventCard'
import './ProfilePage.css'

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuth()
  const { events } = useEvents()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('upcoming')

  // Events user is participating in
  const userEvents = events.filter(e =>
    e.participants.includes(currentUser?.id)
  )

  // Events user is hosting
  const hostedEvents = events.filter(e => e.host === currentUser?.id)

  const [editing, setEditing] = useState(false)
  const avatarInputRef = useRef(null)
  const [editForm, setEditForm] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || null,
    interests: currentUser?.interests || [],
  })

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    if (file.size > 2 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const avatarData = ev.target.result
      setEditForm(prev => ({ ...prev, avatar: avatarData }))
      updateProfile({ avatar: avatarData })
      toast.success('プロフィール画像を更新しました')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    updateProfile(editForm)
    setEditing(false)
    toast.success('プロフィールを更新しました')
  }

  return (
    <div className="profile-page" id="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header glass-card animate-fade-in-up">
          <div className="profile-header-inner">
            <div className="profile-avatar-wrap" onClick={() => avatarInputRef.current?.click()}>
              <UserAvatar name={currentUser?.name || editForm.name} src={currentUser?.avatar} size="xl" />
              <div className="profile-avatar-overlay">
                <span>📷</span>
              </div>
              <input
                type="file"
                ref={avatarInputRef}
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className="profile-header-info">
              {editing ? (
                <div className="profile-edit-form">
                  <div className="form-group">
                    <label className="form-label">名前</label>
                    <input
                      type="text"
                      className="input-field"
                      value={editForm.name}
                      onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">自己紹介</label>
                    <textarea
                      className="input-field"
                      value={editForm.bio}
                      onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="profile-edit-actions">
                    <button className="btn btn-primary" onClick={handleSave}>保存</button>
                    <button className="btn btn-ghost" onClick={() => setEditing(false)}>キャンセル</button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="profile-name">{currentUser?.name}</h1>
                  <p className="profile-bio">{currentUser?.bio || '自己紹介を追加しましょう'}</p>
                  <div className="profile-interests">
                    {(currentUser?.interests || []).map((interest, i) => (
                      <span key={i} className="badge badge-amber">{interest}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            {!editing && (
              <button
                className="btn btn-secondary profile-edit-btn"
                onClick={() => {
                  setEditForm({
                    name: currentUser?.name || '',
                    bio: currentUser?.bio || '',
                    avatar: currentUser?.avatar || null,
                    interests: currentUser?.interests || [],
                  })
                  setEditing(true)
                }}
                id="edit-profile-btn"
              >
                ✏️ 編集
              </button>
            )}
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-number">{userEvents.length}</span>
              <span className="profile-stat-label">参加イベント</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-number">{hostedEvents.length}</span>
              <span className="profile-stat-label">主催イベント</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-number">{currentUser?.interests?.length || 0}</span>
              <span className="profile-stat-label">興味ジャンル</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs animate-fade-in-up delay-1">
          <button
            className={`profile-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
            id="tab-upcoming"
          >
            📅 参加予定
          </button>
          <button
            className={`profile-tab ${activeTab === 'hosted' ? 'active' : ''}`}
            onClick={() => setActiveTab('hosted')}
            id="tab-hosted"
          >
            👑 主催イベント
          </button>
        </div>

        {/* Events */}
        <div className="profile-events">
          {activeTab === 'upcoming' && (
            userEvents.length > 0 ? (
              <div className="profile-events-grid">
                {userEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            ) : (
              <div className="profile-empty glass-card">
                <span className="empty-icon">📅</span>
                <h3>参加予定のイベントはありません</h3>
                <p>イベントを探して、新しい飲み仲間と出会おう！</p>
                <Link to="/events" className="btn btn-primary">イベントを探す</Link>
              </div>
            )
          )}

          {activeTab === 'hosted' && (
            hostedEvents.length > 0 ? (
              <div className="profile-events-grid">
                {hostedEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            ) : (
              <div className="profile-empty glass-card">
                <span className="empty-icon">✨</span>
                <h3>まだイベントを作成していません</h3>
                <p>飲み仲間を探して、最初のイベントを作成しよう！</p>
                <Link to="/create" className="btn btn-primary">イベントを作成</Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
