import express from 'express';

import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid';

const app = express()
const port = 3001

app.get('/', (req, res) => {
  /**
   * Solo por simplicidad, se usa JSONFileSync
   * si fuese un caso real, se usaria asincronico, para evitar el bloqueo del hilo principal
   */
  const db = new LowSync(new JSONFileSync('db.json'), {
    tasks: []
  })

  console.log(db)

  res.json(db.data?.tasks || [])
})

app.post('/tasks', (req, res) => {
  const { title } = req.body

  const task = {
    id: uuidv4(),
    title,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  db.data?.tasks.push(task)
  db.write()

  res.status(201).json(task)
})

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params

  const task = db.data?.tasks.find(t => t.id === id)
  if (!task) return res.status(404).json({ error: 'Task not found' })

  task.status = 'completed';
  task.updatedAt = new Date().toISOString()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
