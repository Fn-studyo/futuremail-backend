const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 9000
const Mail = require('./src/controllers/mailController')

app.use(express.json());
app.use(cors());
  

app.get('/', (req, res) => res.sendFile(__dirname +'/public/index.html'))

app.post('/reminder', Mail.reminder)

app.post('/future', Mail.future)

app.post('/task', Mail.task)

app.listen(port, () => console.log(`App Working on port https://localhost:${port}`))