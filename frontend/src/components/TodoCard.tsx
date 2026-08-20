import { Todo, TodoStatus } from '../types/todo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

interface Props {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoCard({ todo, onUpdate, onDelete }: Props) {
  const handleStatusChange = (status: TodoStatus) => {
    onUpdate({ ...todo, status });
  };

  return (
    <Card className="bg-card border-border shadow-xs hover:border-zinc-700 transition-colors">
      <CardContent className="p-4 flex flex-col gap-3">
        <p className="text-sm font-normal text-foreground leading-normal break-words">
          {todo.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 gap-2">
          <Select value={todo.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-7 text-xs w-[115px] bg-background border-input font-normal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="OPEN" className="text-xs">Open</SelectItem>
              <SelectItem value="IN_PROGRESS" className="text-xs">In Progress</SelectItem>
              <SelectItem value="DONE" className="text-xs">Done</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}