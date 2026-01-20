import { JSONFilePreset } from 'lowdb/node'

type Task = {
    id: string
    title: string
    status: 'pending' | 'completed' | 'deleted' | 'delayed'
    createdAt: string
    updatedAt: string
}

type Data = {
    tasks: Task[]
}

// Read or create db.json
const defaultData: Data = { tasks: [] }
const db = await JSONFilePreset('db.json', defaultData)

db.data.tasks.push({
    id: '1',
    title: 'Task 1',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
})

await db.write()