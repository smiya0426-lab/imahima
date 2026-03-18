import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { MOCK_USERS, MOCK_EVENTS } from '../data/mockData'
import { INITIAL_COMMENTS, INITIAL_NOTIFICATIONS } from '../data/extraData'

// ============================================
// Auth Context
// ============================================
const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('imahima_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('imahima_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('imahima_user')
    }
  }, [currentUser])

  const login = useCallback((email, password) => {
    // Demo: find user by email or use first user
    const user = MOCK_USERS.find(u => u.email === email)
    if (user && password.length >= 4) {
      setCurrentUser(user)
      return { success: true }
    }
    // For demo, allow any email if password is 'demo'
    if (password === 'demo' || password === 'password') {
      const demoUser = { ...MOCK_USERS[0], email, name: email.split('@')[0] }
      setCurrentUser(demoUser)
      return { success: true }
    }
    return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' }
  }, [])

  const signup = useCallback((userData) => {
    const newUser = {
      id: `u${Date.now()}`,
      name: userData.name,
      email: userData.email,
      age: userData.age || 25,
      bio: userData.bio || '',
      avatar: null,
      interests: userData.interests || [],
    }
    setCurrentUser(newUser)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const updateProfile = useCallback((updates) => {
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, updateProfile, isLoggedIn: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ============================================
// Events Context
// ============================================
const EventsContext = createContext(null)

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used within EventsProvider')
  return ctx
}

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('imahima_events')
    if (saved !== null) return JSON.parse(saved)
    // First time: load mock data and mark as initialized
    localStorage.setItem('imahima_events', JSON.stringify(MOCK_EVENTS))
    return MOCK_EVENTS
  })

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('imahima_comments')
    if (saved !== null) return JSON.parse(saved)
    localStorage.setItem('imahima_comments', JSON.stringify(INITIAL_COMMENTS))
    return INITIAL_COMMENTS
  })

  useEffect(() => {
    localStorage.setItem('imahima_events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem('imahima_comments', JSON.stringify(comments))
  }, [comments])

  const addEvent = useCallback((eventData) => {
    const newEvent = {
      ...eventData,
      id: `e${Date.now()}`,
      participants: [eventData.host],
      image: null,
    }
    setEvents(prev => [newEvent, ...prev])
    return newEvent
  }, [])

  const joinEvent = useCallback((eventId, userId) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId && !e.participants.includes(userId) && e.participants.length < e.maxParticipants) {
        return { ...e, participants: [...e.participants, userId] }
      }
      return e
    }))
  }, [])

  const leaveEvent = useCallback((eventId, userId) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId && e.host !== userId) {
        return { ...e, participants: e.participants.filter(p => p !== userId) }
      }
      return e
    }))
  }, [])

  const getEventById = useCallback((id) => {
    return events.find(e => e.id === id)
  }, [events])

  const addComment = useCallback((eventId, comment) => {
    const newComment = {
      id: `c${Date.now()}`,
      eventId,
      ...comment,
      timestamp: new Date().toISOString(),
    }
    setComments(prev => [...prev, newComment])
    return newComment
  }, [])

  const getComments = useCallback((eventId) => {
    return comments.filter(c => c.eventId === eventId)
  }, [comments])

  const deleteComment = useCallback((commentId) => {
    setComments(prev => prev.filter(c => c.id !== commentId))
  }, [])

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId))
    setComments(prev => prev.filter(c => c.eventId !== eventId))
  }, [])

  return (
    <EventsContext.Provider value={{
      events, addEvent, joinEvent, leaveEvent, getEventById, deleteEvent,
      comments, addComment, getComments, deleteComment
    }}>
      {children}
    </EventsContext.Provider>
  )
}

// ============================================
// Notifications Context
// ============================================
const NotificationsContext = createContext(null)

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider')
  return ctx
}

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('imahima_notifications')
    if (saved !== null) return JSON.parse(saved)
    localStorage.setItem('imahima_notifications', JSON.stringify(INITIAL_NOTIFICATIONS))
    return INITIAL_NOTIFICATIONS
  })

  useEffect(() => {
    localStorage.setItem('imahima_notifications', JSON.stringify(notifications))
  }, [notifications])

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: `n${Date.now()}`,
      ...notification,
      read: false,
      timestamp: new Date().toISOString(),
    }
    setNotifications(prev => [newNotif, ...prev])
  }, [])

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationsContext.Provider value={{
      notifications, addNotification, markAsRead, markAllAsRead, unreadCount
    }}>
      {children}
    </NotificationsContext.Provider>
  )
}
