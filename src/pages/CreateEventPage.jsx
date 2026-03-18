import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useEvents, useNotifications } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { CATEGORIES, AREAS } from '../data/mockData'
import './CreateEventPage.css'

export default function CreateEventPage() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { addEvent } = useEvents()
  const { addNotification } = useNotifications()
  const toast = useToast()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    area: '',
    venue: '',
    date: '',
    time: '',
    maxParticipants: 6,
    price: '',
    tags: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEvent = addEvent({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      area: formData.area,
      venue: formData.venue,
      date: formData.date,
      time: formData.time,
      maxParticipants: parseInt(formData.maxParticipants),
      price: formData.price || '各自負担',
      host: currentUser?.id,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    })

    addNotification({
      type: 'event_new',
      title: 'イベントを作成しました',
      message: `「${formData.title}」が公開されました`,
      icon: '✨',
      link: `/events/${newEvent.id}`,
    })

    toast.success(`「${formData.title}」を作成しました！🎉`)
    setSubmitted(true)

    setTimeout(() => {
      navigate(`/events/${newEvent.id}`)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="create-event-page" id="create-event-page">
        <div className="container">
          <div className="success-card glass-card animate-scale-in">
            <div className="success-icon">🎉</div>
            <h2>イベントを作成しました！</h2>
            <p>「{formData.title}」が公開されました。</p>
            <p className="success-note">イベント詳細ページに移動します...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="create-event-page" id="create-event-page">
      <div className="container">
        <div className="create-header animate-fade-in-down">
          <h1 className="create-title">
            ✨ イベントを<span className="text-gradient">作成</span>
          </h1>
          <p className="create-subtitle">
            飲み仲間を募集して、最高の一夜を企画しよう
          </p>
        </div>

        <form className="create-form animate-fade-in-up delay-1" onSubmit={handleSubmit}>
          <div className="form-section glass-card">
            <h2 className="form-section-title">📝 基本情報</h2>

            <div className="form-group">
              <label className="form-label" htmlFor="event-title">
                イベント名 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="event-title"
                name="title"
                className="input-field"
                placeholder="例：🍺 渋谷クラフトビール飲み比べナイト"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="event-description">
                イベント詳細 <span className="required">*</span>
              </label>
              <textarea
                id="event-description"
                name="description"
                className="input-field"
                placeholder="イベントの内容、目的、雰囲気などを書きましょう"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="event-category">
                  カテゴリ <span className="required">*</span>
                </label>
                <select
                  id="event-category"
                  name="category"
                  className="input-field"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">カテゴリを選択</option>
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-price">
                  予算目安
                </label>
                <input
                  type="text"
                  id="event-price"
                  name="price"
                  className="input-field"
                  placeholder="例：3,000円〜"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="event-tags">
                タグ（カンマ区切り）
              </label>
              <input
                type="text"
                id="event-tags"
                name="tags"
                className="input-field"
                placeholder="例：ビール, 飲み比べ, 初心者歓迎"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section glass-card">
            <h2 className="form-section-title">📍 場所・日時</h2>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="event-area">
                  エリア <span className="required">*</span>
                </label>
                <select
                  id="event-area"
                  name="area"
                  className="input-field"
                  value={formData.area}
                  onChange={handleChange}
                  required
                >
                  <option value="">エリアを選択</option>
                  {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-venue">
                  場所・お店の名前 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="event-venue"
                  name="venue"
                  className="input-field"
                  placeholder="例：Craft Beer Market 渋谷店"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="event-date">
                  日付 <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="event-date"
                  name="date"
                  className="input-field"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-time">
                  開始時間 <span className="required">*</span>
                </label>
                <input
                  type="time"
                  id="event-time"
                  name="time"
                  className="input-field"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-max">
                  定員
                </label>
                <input
                  type="number"
                  id="event-max"
                  name="maxParticipants"
                  className="input-field"
                  min="2"
                  max="30"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate(-1)}>
              キャンセル
            </button>
            <button type="submit" className="btn btn-primary btn-lg" id="submit-event">
              🍻 イベントを公開する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
