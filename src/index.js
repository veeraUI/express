import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {v4 as uuidV4} from 'uuid'
import models from '../models'


const app = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* custom middleware which sets a param me as the user */
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next()
})


app.get('/messages', (req, res) => {
  res.send(Object.values(req.context.models.messages))
})

app.get('/messages/:messageId', (req, res) => {
  res.send(req.context.models.messages[req.params.messageId])
})

app.post('/messages', (req, res) => {
  const id = uuidV4()
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  }
  req.context.models.messages[id] = message
  return res.send(req.context.models.messages)
})

app.delete('/message/:messageId', (req, res) => {
  const {[req.params.messageId]: deleteMessage, ...otherMessages} = req.context.models.messages

  req.context.models.messages = otherMessages
  return res.send(otherMessages)
})

app.get('/users', (req, res) => {
  res.send(Object.values(req.context.models.users))
})

app.post('/users', (req, res) => {
  res.send('Users Post reqest')
})

app.get('/users/:userId', (req, res) => {
  res.send(req.context.models.users[req.params.userId])
})

app.patch('/users/:userId', (req, res) => {
  res.send(Object.entries(req.context.models.users).find(a => a.id === req.params.userId))
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