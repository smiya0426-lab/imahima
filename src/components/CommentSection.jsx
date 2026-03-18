import { useState, useRef } from 'react'
import { useAuth } from '../context/AppContext'
import { useEvents } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import UserAvatar from './UserAvatar'
import { formatRelativeTime } from '../data/extraData'
import './CommentSection.css'

export default function CommentSection({ eventId }) {
  const { currentUser, isLoggedIn } = useAuth()
  const { getComments, addComment, deleteComment } = useEvents()
  const toast = useToast()
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const comments = getComments(eventId)

  const handleImageSelect = (e) => {
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
      setImagePreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return
    if (!isLoggedIn) {
      toast.error('コメントするにはログインが必要です')
      return
    }

    addComment(eventId, {
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: text.trim(),
      image: imagePreview || null,
    })
    setText('')
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    toast.success('コメントを投稿しました')
  }

  const handleDelete = (commentId) => {
    deleteComment(commentId)
    toast.info('コメントを削除しました')
  }

  return (
    <div className="comment-section" id="comment-section">
      <h2 className="detail-section-title">
        💬 コメント（{comments.length}）
      </h2>

      {/* Comment Form */}
      {isLoggedIn && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <UserAvatar name={currentUser?.name} src={currentUser?.avatar} size="md" />
          <div className="comment-input-wrap">
            <textarea
              className="input-field comment-input"
              placeholder="コメントを入力..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={2}
              id="comment-input"
            />
            {/* Image Preview */}
            {imagePreview && (
              <div className="comment-image-preview">
                <img src={imagePreview} alt="添付画像" />
                <button type="button" className="comment-image-remove" onClick={removeImage}>✕</button>
              </div>
            )}
            <div className="comment-actions">
              <button
                type="button"
                className="comment-attach-btn"
                onClick={() => fileInputRef.current?.click()}
                title="画像を添付"
              >
                📷 画像
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              <button
                type="submit"
                className="btn btn-primary comment-submit"
                disabled={!text.trim() && !imagePreview}
                id="comment-submit"
              >
                投稿
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Comment List */}
      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="comment-empty">
            まだコメントはありません。最初のコメントを投稿しよう！
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <UserAvatar name={comment.userName} src={comment.userAvatar} size="md" />
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-author">{comment.userName}</span>
                  <span className="comment-time">{formatRelativeTime(comment.timestamp)}</span>
                  {isLoggedIn && comment.userId === currentUser?.id && (
                    <button
                      className="comment-delete-btn"
                      onClick={() => handleDelete(comment.id)}
                      title="コメントを削除"
                    >
                      削除する
                    </button>
                  )}
                </div>
                {comment.text && <p className="comment-text">{comment.text}</p>}
                {comment.image && (
                  <div className="comment-image">
                    <img src={comment.image} alt="添付画像" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
