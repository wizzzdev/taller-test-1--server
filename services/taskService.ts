import { DatabaseSync } from 'node:sqlite';
import type { Task } from '../models/task.js';

const db = new DatabaseSync('tasks.db');

type TaskCreationProps = Pick<Task, 'title' | 'description' | 'status'>;
type TaskUpdateProps = Pick<Task, 'id' | 'status'>;

class TaskService {
  public getTasks = () => {
    const result = db.prepare('SELECT * FROM tasks').get();

    return result;
  }

  public createTask = (task: TaskCreationProps) => {
    const result = db.prepare('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)').run(task.title, task.description ?? null, task.status);
    return result;
  }

  public updateTask = (id: string, task: TaskUpdateProps) => {
    const result = db.prepare('UPDATE tasks SET status = ? WHERE id = ?').run(task.status, id);
    if (!result.changes) {
      const error = new Error('Task not found');
      (error as any).code = 'TASK_NOT_FOUND';
    }
    return result;
  }

  public getTaskById = (id: string) => {
    const result = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    if (!result) {
      const error = new Error('Task not found');
      (error as any).code = 'TASK_NOT_FOUND';
      throw error;
    }
    return result;
  }
}

export default new TaskService();