require("dotenv").config();
const express = require("express");
const server = express();
const port = 3000 || process.env.PORT;

//get bot instance

const { getBotInstance } = require("./botconfig/botInstance");
const bot = getBotInstance()
server.use(express.json());

const {
  Test,
  Start,
  Stock
} = require("./controller/commandHandlers")

server.get("/test", (req, res) => {
  console.log("bot running");
});

server.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

server.listen(port, () => {
  console.log("bot up and  running sucessfully");
});

// bot.on("message", (msg) => {
//   bot.sendMessage(msg.chat.id, "I am alive!");
// });

bot.onText(/\/test/, Test);
bot.onText(/\/start/, Start);
bot.onText(/\/stock/,Stock)