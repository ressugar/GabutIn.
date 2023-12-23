const express = require('express')
const app = express();
const port = 3000
const BodyParser = require('body-parser')
const db = require('./koneksi')

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { Socket } = require('dgram');
const io = new Server (server)

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(BodyParser.urlencoded({ extended : true}))

db.connect((err)=>{
  if (err) throw err
  const sql = "SELECT * FROM akun"
  db.query(sql,(err, result)=>{
    const users = JSON.parse(JSON.stringify(result))
    console.log("chat",users)
    app.get('/', (req, res) => {
      res.render("login",{users: users, title: "GabutIn."})
    });
  })
})

app.get("/chat", (req, res)=>{
  res.render("chat",{title: "GabutIn."})
})

app.post("/chat", (req, res)=>{
  res.redirect("/chat")
})

io.on('connection',(socket)=>{
  socket.on('message', (data)=>{
    console.log('data',data)
    socket.broadcast.emit('message', data)
  })
})
  server.listen(3000, () => {
    console.log('App listening on port 3000');
  });