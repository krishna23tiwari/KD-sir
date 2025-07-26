require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const requestIp = require("request-ip");
const port = process.env.PORT
const fileUpload = require("express-fileupload");
const scheduleVisitorReset = require("./Cron/VisitorsReset");

app.use(express.json())
app.use(cors())
app.use(fileUpload({ useTempFiles: false, }));
app.use(requestIp.mw());
// app.use(
//   fileUpload({
//     useTempFiles: false, 
//     limits: { fileSize: 10 * 1024 * 1024 }, 
//   })
// );

const MongoUrl = process.env.MONGOURL

mongoose.connect(MongoUrl)
.then(() => console.log('connected'))
.catch(() => console.log("not connected"))

const visitors = require('./Router/VisitorRoutes')
const userroute = require('./Router/UserRouter')
const projectroute = require('./Router/ProjectRouter')

app.use('/visitor', visitors)
app.use('/user', userroute)
app.use('/projects', projectroute)

scheduleVisitorReset();

app.listen(port, () => {
    console.log(`${port} is listning`)
})
