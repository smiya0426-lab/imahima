import './UserAvatar.css'

export default function UserAvatar({ name, src, size = 'md', className = '' }) {
  const initial = name ? name.charAt(0) : '?'

  // Generate a consistent color from name
  const colors = [
    '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4',
    '#10b981', '#f97316', '#ec4899', '#6366f1'
  ]
  const colorIndex = name
    ? name.charCodeAt(0) % colors.length
    : 0
  const bgColor = colors[colorIndex]

  return (
    <div
      className={`user-avatar avatar-${size} ${src ? 'has-image' : ''} ${className}`}
      style={{ '--avatar-color': bgColor }}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} className="avatar-image" />
      ) : (
        <span className="avatar-initial">{initial}</span>
      )}
    </div>
  )
}
