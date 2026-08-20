export type TodoStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'; // all status will be here...

export interface Todo {
  id: string;
  description: string;
  status: TodoStatus;
}

export type NewTodo = Omit<Todo, 'id'>;