import { useState, useRef } from 'react'
import { useAuth } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import UserAvatar from '../components/UserAvatar'
import './SettingsPage.css'

export default function SettingsPage() {
  const { currentUser, updateProfile, logout } = useAuth()
  const toast = useToast()
  const avatarRef = useRef(null)

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    age: currentUser?.age || '',
  })

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('画像ファイルを選択してください')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('画像サイズは2MB以下にしてください')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      updateProfile({ avatar: ev.target.result })
      toast.success('プロフィール画像を更新しました')
    }
    reader.readAsDataURL(file)
  }

  const [notifSettings, setNotifSettings] = useState({
    eventJoin: true,
    comments: true,
    reminders: true,
    newEvents: true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateProfile(form)
    toast.success('プロフィールを更新しました')
  }

  const handleToggle = (key) => {
    setNotifSettings(prev => ({ ...prev, [key]: !prev[key] }))
    toast.info('通知設定を更新しました')
  }

  const handleClearData = () => {
    if (window.confirm('すべてのローカルデータを削除しますか？この操作は取り消せません。')) {
      localStorage.clear()
      // Set empty data so mock data won't be reloaded on restart
      localStorage.setItem('imahima_events', JSON.stringify([]))
      localStorage.setItem('imahima_comments', JSON.stringify([]))
      localStorage.setItem('imahima_notifications', JSON.stringify([]))
      logout()
      window.location.href = '/'
    }
  }

  return (
    <div className="settings-page" id="settings-page">
      <div className="container">
        <div className="settings-header animate-fade-in-down">
          <h1 className="settings-title">
            ⚙️ <span className="text-gradient">設定</span>
          </h1>
          <p className="settings-subtitle">アカウントの管理と各種設定</p>
        </div>

        <div className="settings-content">
          {/* Account Settings */}
          <section className="settings-section glass-card animate-fade-in-up delay-1">
            <h2 className="settings-section-title">👤 アカウント情報</h2>

            <div className="settings-avatar-row">
              <div className="settings-avatar-wrap" onClick={() => avatarRef.current?.click()}>
                <UserAvatar name={form.name} src={currentUser?.avatar} size="xl" />
                <div className="settings-avatar-overlay">📷</div>
              </div>
              <input
                type="file"
                ref={avatarRef}
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: 'none' }}
              />
              <div className="settings-avatar-info">
                <p className="settings-avatar-name">{form.name}</p>
                <p className="settings-avatar-email">{form.email}</p>
                <button
                  type="button"
                  className="settings-avatar-change"
                  onClick={() => avatarRef.current?.click()}
                >
                  📷 プロフィール画像を変更
                </button>
              </div>
            </div>

            <div className="settings-form">
              <div className="form-row-settings">
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-name">表示名</label>
                  <input
                    type="text"
                    id="settings-name"
                    name="name"
                    className="input-field"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="settings-age">年齢</label>
                  <input
                    type="number"
                    id="settings-age"
                    name="age"
                    className="input-field"
                    value={form.age}
                    onChange={handleChange}
                    min="20"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="settings-email">メールアドレス</label>
                <input
                  type="email"
                  id="settings-email"
                  name="email"
                  className="input-field"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="settings-bio">自己紹介</label>
                <textarea
                  id="settings-bio"
                  name="bio"
                  className="input-field"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button className="btn btn-primary" onClick={handleSave} id="save-settings">
                変更を保存
              </button>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="settings-section glass-card animate-fade-in-up delay-2">
            <h2 className="settings-section-title">🔔 通知設定</h2>

            <div className="toggle-list">
              <div className="toggle-item">
                <div>
                  <div className="toggle-label">イベント参加通知</div>
                  <div className="toggle-desc">誰かがあなたのイベントに参加した時</div>
                </div>
                <button
                  className={`toggle-switch ${notifSettings.eventJoin ? 'on' : ''}`}
                  onClick={() => handleToggle('eventJoin')}
                >
                  <div className="toggle-knob"></div>
                </button>
              </div>

              <div className="toggle-item">
                <div>
                  <div className="toggle-label">コメント通知</div>
                  <div className="toggle-desc">イベントに新しいコメントが投稿された時</div>
                </div>
                <button
                  className={`toggle-switch ${notifSettings.comments ? 'on' : ''}`}
                  onClick={() => handleToggle('comments')}
                >
                  <div className="toggle-knob"></div>
                </button>
              </div>

              <div className="toggle-item">
                <div>
                  <div className="toggle-label">リマインダー</div>
                  <div className="toggle-desc">参加予定のイベント前日に通知</div>
                </div>
                <button
                  className={`toggle-switch ${notifSettings.reminders ? 'on' : ''}`}
                  onClick={() => handleToggle('reminders')}
                >
                  <div className="toggle-knob"></div>
                </button>
              </div>

              <div className="toggle-item">
                <div>
                  <div className="toggle-label">新着イベント</div>
                  <div className="toggle-desc">興味のあるカテゴリの新しいイベント</div>
                </div>
                <button
                  className={`toggle-switch ${notifSettings.newEvents ? 'on' : ''}`}
                  onClick={() => handleToggle('newEvents')}
                >
                  <div className="toggle-knob"></div>
                </button>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="settings-section glass-card settings-danger animate-fade-in-up delay-3">
            <h2 className="settings-section-title">⚠️ データ管理</h2>
            <p className="settings-danger-text">
              すべてのローカルデータ（イベント、コメント、通知）を削除します。この操作は取り消せません。
            </p>
            <button className="btn btn-danger" onClick={handleClearData} id="clear-data">
              すべてのデータを削除する
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
