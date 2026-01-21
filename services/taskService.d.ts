import type { Task } from '../models/task.js';
type TaskCreationProps = Pick<Task, 'title' | 'description' | 'status'>;
type TaskUpdateProps = Pick<Task, 'id' | 'status'>;
declare class TaskService {
    getTasks: () => Record<string, import("node:sqlite").SQLOutputValue>[];
    createTask: (task: TaskCreationProps) => import("node:sqlite").StatementResultingChanges;
    updateTask: (id: string, task: TaskUpdateProps) => import("node:sqlite").StatementResultingChanges;
    getTaskById: (id: string) => Record<string, import("node:sqlite").SQLOutputValue>;
}
declare const _default: TaskService;
export default _default;
//# sourceMappingURL=taskService.d.ts.map