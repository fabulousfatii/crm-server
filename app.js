const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const cookieParser = require("cookie-parser")
const userRouter = require("./router/employeeRoute");
const authRouter = require("./router/authrouter")
const attendenceRouter = require("./router/attendenceRouter")
const announcementRouter = require("./router/anouncementRouter")
const notificationRouter = require("./router/notificationRouter")
const taskRouter = require("./router/taskRouter")
const connectdb = require("./db")
const cors = require("cors")



const allowedorigins= ["http://localhost:5173"]
connectdb()
app.use(express.json());

app.use(
  cors({
    origin: allowedorigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser()) // to parse cookies

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/attendence', attendenceRouter);
app.use('/api/announcement', announcementRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/tasks', taskRouter);



app.get('/', (req, res) => {
  res.send("connected")
 
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});