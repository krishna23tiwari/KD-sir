require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT
const scheduleVisitorReset = require("./Cron/VisitorsReset");

app.use(express.json())
app.use(cors())

const MongoUrl = process.env.MONGOURL

mongoose.connect(MongoUrl)
.then(() => console.log('connected'))
.catch(() => console.log("not connected"))

const visitors = require('./Router/VisitorRoutes')
const userroute = require('./Router/UserRouter')

app.use('/visitor', visitors)
app.use('/user', userroute)

scheduleVisitorReset();

app.listen(port, () => {
    console.log(`${port} is listning`)
})
