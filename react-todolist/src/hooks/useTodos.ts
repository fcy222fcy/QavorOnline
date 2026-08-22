import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Filter, Todo } from '../types'

const STORAGE_KEY = 'react-todolist:v1'

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Todo[]) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(load)
  const [filter, setFilter] = useState<Filter>('all')

  // Persist to localStorage on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      /* storage may be unavailable (private mode / quota) — ignore */
    }
  }, [todos])

  const add = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ])
  }, [])

  const toggle = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }, [])

  const edit = useCallback((id: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)))
  }, [])

  const remove = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }, [])

  const visible = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed)
      case 'completed':
        return todos.filter((t) => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos])
  const completedCount = todos.length - activeCount

  return {
    todos,
    visible,
    filter,
    setFilter,
    add,
    toggle,
    edit,
    remove,
    clearCompleted,
    activeCount,
    completedCount,
  }
}
