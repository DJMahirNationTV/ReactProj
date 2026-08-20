import { useEffect, useState } from 'react';
import { Todo, NewTodo } from './types/todo';
import { todoApi } from './services/todo-api';
import { TodoForm } from './components/TodoForm';
import { TodoCard } from './components/TodoCard';
import { Badge } from '@/components/ui/badge';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async (newTodo: NewTodo) => {
    const created = await todoApi.create(newTodo);
    setTodos((prev) => [...prev, created]);
  };

  const handleUpdate = async (updatedTodo: Todo) => {
    const saved = await todoApi.update(updatedTodo);
    setTodos((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
  };

  const handleDelete = async (id: string) => {
    await todoApi.delete(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const columns: { label: string; status: Todo['status'] }[] = [
    { label: 'Open', status: 'OPEN' },
    { label: 'In Progress', status: 'IN_PROGRESS' },
    { label: 'Done', status: 'DONE' },
  ];

  return (
    <main className="min-h-screen bg-muted/20 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Task Board</h1>
          <p className="text-muted-foreground text-sm">Manage, track, and complete your workflow.</p>
        </header>

        <TodoForm onAdd={handleAdd} />

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(({ label, status }) => {
              const columnTodos = todos.filter((t) => t.status === status);
              return (
                <section key={status} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </h2>
                    <Badge variant="secondary" className="rounded-full">
                      {columnTodos.length}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-3 min-h-[200px] p-2 bg-muted/40 rounded-lg border border-border/50">
                    {columnTodos.map((todo) => (
                      <TodoCard
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}