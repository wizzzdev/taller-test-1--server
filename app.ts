import express from 'express';

import taskController from './controllers/taskController.js';

const app = express();
const port = 3001;

app.get('/', taskController.handleGetTasks);
app.post('/tasks', taskController.handleCreateTask);
app.patch('/tasks/:id', taskController.handleUpdateTask);
app.get('/tasks/:id', taskController.handleGetTaskById);

