import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useEvents } from '../context/AppContext'
import EventCard from '../components/EventCard'
import { CATEGORIES, AREAS } from '../data/mockData'
import './EventsPage.css'

export default function EventsPage() {
  const { events } = useEvents()
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedArea, setSelectedArea] = useState('')

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = !searchQuery ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.includes(searchQuery))

      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory

      const matchesArea = !selectedArea || event.area === selectedArea

      return matchesSearch && matchesCategory && matchesArea
    })
  }, [events, searchQuery, selectedCategory, selectedArea])

  return (
    <div className="events-page" id="events-page">
      <div className="container">
        <div className="events-header animate-fade-in-down">
          <h1 className="events-title">
            🍻 イベントを<span className="text-gradient">探す</span>
          </h1>
          <p className="events-subtitle">
            あなたにぴったりの飲みイベントを見つけよう
          </p>
        </div>

        <div className="events-filters glass-card animate-fade-in-up delay-1">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="キーワードで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="event-search-input"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="検索をクリア"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-row">
            <div className="category-filters">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`filter-cat-${cat.id}`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <select
              className="input-field area-select"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              id="filter-area"
            >
              <option value="">📍 すべてのエリア</option>
              {AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="events-results">
          <div className="events-results-header">
            <span className="results-count">
              {filteredEvents.length}件のイベント
            </span>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="events-empty glass-card">
              <span className="empty-icon">🔍</span>
              <h3>イベントが見つかりません</h3>
              <p>フィルターを変更して、もう一度お試しください。</p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedArea('')
                }}
                id="reset-filters"
              >
                フィルターをリセット
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
