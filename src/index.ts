import dotenv from "dotenv";
dotenv.config()

import Express from 'express'
import {createServer} from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import { initSocket, io, loco } from './storage'
import router from './router'

const app = Express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

const requiredKeys = ['email', 'pw', 'uuid', 'deviceName']
requiredKeys.forEach(key => process.env[key] || (() => {
  throw new Error(`${key} was not provided`)
})())
console.log("All required keys are correctly provided");
const { port: PORT = 8080 } = process.env;

const server = createServer(app)
initSocket(server)

import './functions/socket'
import autologin from "./functions/autologin";

app.use(router)
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
  autologin()
})