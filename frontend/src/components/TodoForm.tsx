import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { NewTodo } from '../types/todo';

interface Props {
  onAdd: (todo: NewTodo) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onAdd({ description: description.trim(), status: 'OPEN' });
    setDescription('');
  };

  return (
    <Card className="mb-8 border-border/40 shadow-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            placeholder="Add a new task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="gap-2">
            <Plus className="h-4 w-4" /> Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}