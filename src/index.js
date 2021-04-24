import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const port = 8080


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log('Express App listening at Port:', port)
})