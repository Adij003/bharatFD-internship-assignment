const path = require('path')
const express = require('express')
const colors = require('colors')

const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()

connectDB()


app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/faqs', require('./routes/faqRoutes'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: 'welcome to the FAQ App'})
    })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

