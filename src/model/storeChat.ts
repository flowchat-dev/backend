import { IChat } from "../types/interfaces";
// import { db } from './connection'
import mongoose, { Schema } from 'mongoose'
import {io} from '../storage'

const db = mongoose.connection
const {
  db_uri: uri,
  db_user: username,
  db_password: password
} = process.env
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', function() {
  console.info('✅ Connected to mongod server✅');
});
mongoose.connect(`mongodb+srv://${username}:${password}@flowchat-db.rbnrr.mongodb.net/flowchat?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const ChatSchema = new Schema({
  text: String,
  channelId: String,
  senderId: String,
  time: Number
})
const Chat = mongoose.model('chat', ChatSchema)

export default (chat: IChat) => {
  const targetChat = new Chat(chat);
  targetChat.save()
}