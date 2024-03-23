const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const connect = require('./config/database-config')
const Chat = require('./models/chat')

const { PORT } = require('./config/server-config')

const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data.roomId, function () {
            console.log('Joining the Room')
        } )
    })

    socket.on('text_sent', async (data) => {
        console.log(data)
        const chat = await Chat.create({
            roomId: data.roomId,
            user: data.username,
            content: data.msg
        })
        io.to(data.roomId).emit('text_received', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.to(data.roomId).emit('someone_typing')
    })
  });

app.get('/chat/:roomId', async (req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomId
    }).select('content user')
    res.render('index', {
        name: 'Ravi',
        id: req.params.roomId,
        chats: chats
    })
})

app.set('view engine', 'ejs')
app.use('/', express.static(__dirname + '/public'))

server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
    await connect();
    console.log('MongoDB connected')
})