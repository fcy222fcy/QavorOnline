import { useEffect, useRef, useState } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onRemove: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onRemove }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      ref.current?.focus()
      ref.current?.select()
    }
  }, [editing])

  const commit = () => {
    onEdit(todo.id, text)
    setEditing(false)
  }

  return (
    <li
      className={`group flex items-center gap-3 rounded-xl border border-line bg-surface/70 px-4 py-3 transition-colors hover:border-brand/40 ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {editing ? (
        <input
          ref={ref}
          className="flex-1 rounded-md border border-brand bg-bg px-2.5 py-1.5 text-sm text-fg outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') {
              setText(todo.text)
              setEditing(false)
            }
          }}
        />
      ) : (
        <>
          <label className="relative inline-flex shrink-0 cursor-pointer">
            <input
              type="checkbox"
              className="peer absolute h-0 w-0 opacity-0"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className="grid h-5 w-5 place-items-center rounded-md border border-line bg-surface-2 text-transparent transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-[#04161a]">
              <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                <path
                  d="M2 8.5l3.5 3.5L14 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>

          <span
            onDoubleClick={() => setEditing(true)}
            className={`flex-1 cursor-text text-sm leading-relaxed text-fg ${
              todo.completed ? 'text-faint line-through' : ''
            }`}
          >
            {todo.text}
          </span>

          <div className="flex shrink-0 gap-1">
            <button
              className="grid h-8 w-8 place-items-center rounded-md border border-transparent text-muted transition-colors hover:border-line-strong hover:bg-white/5 hover:text-fg"
              title="编辑"
              onClick={() => setEditing(true)}
              aria-label="编辑"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              className="grid h-8 w-8 place-items-center rounded-md border border-transparent text-muted transition-colors hover:border-danger/40 hover:text-danger"
              title="删除"
              onClick={() => onRemove(todo.id)}
              aria-label="删除"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  )
}
