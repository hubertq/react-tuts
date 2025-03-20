require('dotenv').config()
const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleaware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

// Connect to a database
connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) =>
	res.status(200).json({ message: 'Welcome to the Support Desk APIs' })
)

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}!`))
