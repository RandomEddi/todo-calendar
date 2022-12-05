const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017/calendarTodo')

const start = async () => {
  try {
    await client.connect()
  } catch (e) {
    console.log(e)
  }
}

start()

const dbTodos = client.db().collection('todos')

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/all-todos', async (req, res) => {
  const todos = await dbTodos.find().toArray()
  res.json(todos)
})

app.post('/api/add-todo', async (req, res) => {
  await dbTodos.insertOne(req.body)
  res.json(req.body)
})

app.delete('/api/delete-todo', async(req, res) => {
  const id = req.query.id
  await dbTodos.deleteOne({id})
  res.json('success')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
