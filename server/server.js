const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const expressJwt = require("express-jwt")
const morgan = require("morgan")
const mongoose = require("mongoose")
//middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({origin: "https://rockthevote.netlify.app"}))
//connect to mongo
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/rtv-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("connected to the rtv database")
)
//routes
app.get("/", (req, res) => {res.send("hello from Express!")})
app.use("/auth", require("./routes/AuthRouter"))
app.use('/api', expressJwt({ secret: process.env.SECRET,  algorithms: ['HS256'] }))
app.use("/api/issue", require("./routes/IssueRouter"))
app.use("/api/issues/comments", require("./routes/CommentRouter"))
//error catching
app.use((err,req,res,next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})
//port listen
app.listen(process.env.PORT || 9000, () => {
  console.log("APP is listening on PORT 9000")
})