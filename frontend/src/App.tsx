import { useEffect, useState } from 'react';
import { Todo, NewTodo, TodoStatus } from './types/todo';
import { todoApi } from './services/todo-api';
import { TodoForm } from './components/TodoForm';
import { TodoCard } from './components/TodoCard';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const columns: { label: string; status: TodoStatus }[] = [
  { label: 'Open', status: 'OPEN' },
  { label: 'In Progress', status: 'IN_PROGRESS' },
  { label: 'Done', status: 'DONE' },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTodos = async () => {
      try {
        const data = await todoApi.getAll();
        if (isMounted) setTodos(data);
      } catch (err) {
        console.error('Failed to load tasks', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTodos();
    return () => {
      isMounted = false;
    };
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-normal">Mahir K</span>
          </div>
          <Badge variant="outline" className="text-xs font-normal border-border">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
          </Badge>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Task Board, manage and track organize your Tasks.
          </p>
        </div>

        <TodoForm onAdd={handleAdd} />

        {loading ? (
          <div className="text-center py-16 text-xs text-muted-foreground">
            Loading tasks...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {columns.map(({ label, status }) => {
              const columnTodos = todos.filter((t) => t.status === status);

              return (
                <div
                  key={status}
                  className="flex flex-col rounded-lg border border-border bg-card/40 p-3"
                >
                  <div className="flex items-center justify-between pb-3 px-1">
                    <span className="text-xs font-medium text-foreground">
                      {label}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-4 px-1.5 font-normal rounded-sm"
                    >
                      {columnTodos.length}
                    </Badge>
                  </div>

                  <Separator className="bg-border mb-3" />

                  <div className="flex flex-col gap-2 min-h-[300px]">
                    {columnTodos.map((todo) => (
                      <TodoCard
                        key={todo.id}
                        todo={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
                    ))}

                    {columnTodos.length === 0 && (
                      <div className="flex flex-col items-center justify-center flex-1 rounded-md border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                        <p className="text-xs">No tasks</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}