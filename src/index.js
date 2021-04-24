import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import models from '../models'
import routes from './routes'

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

app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)
app.use('/', routes.root)

app.listen(port, () => {
  console.log('Express App listening at Port:', port)
})