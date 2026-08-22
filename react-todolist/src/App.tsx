import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import { TodoItem } from './components/TodoItem'
import type { Filter } from './types'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
]

export default function App() {
  const {
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
    todos,
  } = useTodos()
  const [draft, setDraft] = useState('')

  const submit = () => {
    add(draft)
    setDraft('')
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="card p-6">
          <header>
            <p className="eyebrow">React · Todo List</p>
            <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Tasks
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              本地持久化的待办清单，与 Qavor 项目共用同一套组件样式。
            </p>
          </header>

          <div className="mt-6 flex gap-3">
            <input
              className="flex-1 rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand"
              placeholder="添加一个任务，回车确认…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
            />
            <button className="btn btn-primary" onClick={submit}>
              添加
            </button>
          </div>

          {visible.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-line-strong px-6 py-10 text-center text-sm text-faint">
              {todos.length === 0 ? '还没有任务，添加一个吧。' : '该筛选下没有任务。'}
            </div>
          ) : (
            <ul className="mt-6 flex flex-col gap-3">
              {visible.map((t) => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  onToggle={toggle}
                  onEdit={edit}
                  onRemove={remove}
                />
              ))}
            </ul>
          )}

          <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <span className="font-mono text-xs text-muted">{activeCount} 项进行中</span>

            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`chip transition-colors ${
                    filter === f.key
                      ? 'border-brand bg-brand text-[#04161a]'
                      : 'hover:border-brand/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <button
              className="btn btn-ghost"
              onClick={clearCompleted}
              disabled={completedCount === 0}
            >
              清除已完成
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}
