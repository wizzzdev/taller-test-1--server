import type { Request, Response } from 'express';
import TaskService from '../services/taskService.js';

export const handleGetTasks = (req: Request, res: Response) => {
  try {
    const tasks = TaskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    if ((error as any).code === 'TASK_NOT_FOUND') {
      res.status(404).json({ error: (error as any).message });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

export const handleCreateTask = (req: Request, res: Response) => {
  try {
    const task = TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const handleUpdateTask = (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const task = TaskService.updateTask(id, req.body);
    res.status(200).json(task);
  } catch (error) {
    if ((error as any).code === 'TASK_NOT_FOUND') {
      res.status(404).json({ error: (error as any).message });
    }
    res.status(500).json({ error: (error as any).message });
  }
};

export const handleGetTaskById = (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const task = TaskService.getTaskById(id);
    res.status(200).json(task);
  } catch (error) {
    if ((error as any).code === 'TASK_NOT_FOUND') {
      res.status(404).json({ error: (error as any).message });
    }
    res.status(500).json({ error: (error as any).message });
  }
};