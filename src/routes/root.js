import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.send(req.context.models.messages)
})

router.post('/', (req, res) => {
  return res.send('Post reqest')
})

router.patch('/', (req, res) => {
  return res.send('Patch request')
})

router.delete('/', (req, res) => {
  return res.send('Delete request')
})

export default router;
