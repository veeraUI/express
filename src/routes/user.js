import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.send(req.context.models.users)
})

router.get('/:userId', (req, res) => {
  res.send(req.context.models.users[req.params.userId])
})


export default router;