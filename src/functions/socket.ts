import { io } from '../storage'
import { Socket } from 'socket.io'
import sendChat from './sendChat'

console.log('Registering IO')
io.on('connection', (socket: Socket) => {
  console.log('Socket Connected')
  socket.on('message', (data) => {
    // console.log(data)
    if(data.type === 'send') sendChat(data.data)
  })
})
