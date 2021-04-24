import { Router } from 'express'
import { v4 as uuidV4 } from 'uuid'

const router = Router()

router.get('/', (req, res) => {
  return res.send(req.context.models.messages)
})

router.get('/:messageId', (req, res) => {
  res.send(req.context.models.messages[req.params.messageId])
})

router.post('/', (req, res) => {
  const id = uuidV4()
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  }
  req.context.models.messages[id] = message
  return res.send(req.context.models.messages)
})

router.delete('/message/:messageId', (req, res) => {
  const {[req.params.messageId]: deleteMessage, ...otherMessages} = req.context.models.messages

  req.context.models.messages = otherMessages
  return res.send(otherMessages)
})

export default router;