const TelegramBot=require("node-telegram-bot-api")

    let botInstance;
const getBotInstance=()=>{
    if(!botInstance){
    if (process.env.NODE_ENV === "prod") {
      botInstance = new TelegramBot(process.env.BOT_TOKEN);
      botInstance.setWebHook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`);
      console.log("bot running in production");
      console.log("webhook set");
    } else {
      botInstance = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
      console.log("bot running in development");
    }
}
  return botInstance;

}


module.exports={getBotInstance};