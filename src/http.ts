import express, { response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import './database';
import { routes } from './routes';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get('/pages/client', (req, resp) => {
  return resp.render('html/client.html');
})

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket)=>{
  console.log('se conectou', socket.id);
})

app.use(express.json())

app.use(routes);

export { http, io } 