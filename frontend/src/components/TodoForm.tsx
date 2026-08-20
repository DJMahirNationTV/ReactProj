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
    <Card className="bg-card border-border mb-8 shadow-xs">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Add a new task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background/50 border-input h-9 text-sm placeholder:text-muted-foreground/60"
          />
          <Button type="submit" size="sm" className="h-9 px-4 shrink-0 font-medium">
            <Plus className="mr-1.5 h-4 w-4" /> Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}