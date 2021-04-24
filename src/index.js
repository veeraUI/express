import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { messages, users } from '../mock/data'

const app = express()
const port = process.env.PORT

app.use(cors())


app.get('/messages', (req, res) => {
  res.send(Object.values(messages))
})

app.get('/messages/:messageId', (req, res) => {
  res.send(messages[req.params.messageId])
})

app.get('/users', (req, res) => {
  res.send(Object.values(users))
})

app.post('/users', (req, res) => {
  res.send('Users Post reqest')
})

app.get('/users/:userId', (req, res) => {
  res.send(users[req.params.userId])
})

app.patch('/users/:userId', (req, res) => {
  res.send(Object.entries(users).find(a => a.id === req.params.userId))
})

app.delete('/users/:userId', (req, res) => {
  res.send('Users Delete request', req.params.userId)
})

app.get('/', (req, res) => {
  res.send('Get request')
})

app.post('/', (req, res) => {
  res.send('Post reqest')
})

app.patch('/', (req, res) => {
  res.send('Patch request')
})

app.delete('/', (req, res) => {
  res.send('Delete request')
})

app.listen(port, () => {
  console.log('Express App listening at Port:', port)
})