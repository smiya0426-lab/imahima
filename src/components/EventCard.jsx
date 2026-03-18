import { Link } from 'react-router-dom'
import { getUserById, getCategoryById, formatDate, getRemainingSpots, isEventFull } from '../data/mockData'
import UserAvatar from './UserAvatar'
import './EventCard.css'

export default function EventCard({ event, index = 0 }) {
  const category = getCategoryById(event.category)
  const host = getUserById(event.host)
  const remaining = getRemainingSpots(event)
  const full = isEventFull(event)

  return (
    <Link
      to={`/events/${event.id}`}
      className={`event-card glass-card animate-fade-in-up delay-${(index % 5) + 1}`}
      id={`event-card-${event.id}`}
    >
      {/* Category Badge */}
      <div className="event-card-header">
        <span className="badge badge-amber">
          {category?.emoji} {category?.label}
        </span>
        {full ? (
          <span className="badge badge-red">満席</span>
        ) : remaining <= 2 ? (
          <span className="badge badge-red">残り{remaining}席</span>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="event-card-title">{event.title}</h3>

      {/* Info */}
      <div className="event-card-info">
        <div className="event-info-item">
          <span className="info-icon">📅</span>
          <span>{formatDate(event.date)} {event.time}</span>
        </div>
        <div className="event-info-item">
          <span className="info-icon">📍</span>
          <span>{event.area} - {event.venue}</span>
        </div>
        <div className="event-info-item">
          <span className="info-icon">💰</span>
          <span>{event.price}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="event-card-tags">
        {event.tags.map((tag, i) => (
          <span key={i} className="event-tag">#{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="event-card-footer">
        <div className="event-host">
          <UserAvatar name={host?.name} size="sm" />
          <span className="host-name">{host?.name}</span>
        </div>
        <div className="event-participants">
          <div className="avatar-group">
            {event.participants.slice(0, 3).map((pid) => {
              const user = getUserById(pid)
              return <UserAvatar key={pid} name={user?.name} size="sm" />
            })}
            {event.participants.length > 3 && (
              <div className="avatar-group-count">
                +{event.participants.length - 3}
              </div>
            )}
          </div>
          <span className="participant-count">
            {event.participants.length}/{event.maxParticipants}
          </span>
        </div>
      </div>
    </Link>
  )
}
