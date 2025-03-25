require('dotenv').config()
const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleaware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

// Connect to a database
connectDB()

const app = express()

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	)
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

app.use(express.json())

app.get('/', (req, res) =>
	res.status(200).json({ message: 'Welcome to the Support Desk API' })
)

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}!`))
