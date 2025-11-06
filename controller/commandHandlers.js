const { getBotInstance } = require("../botconfig/botInstance");
const axios=require("axios")

const bot = getBotInstance();

const Test = async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "bot running ");
};
const style = { parse_mode: "HTML" };

const Start = async (msg) => {


  const chatId = msg.chat.id;

  console.log(chatId)
    bot.sendMessage(
      chatId,
      `<i> Hii <b> ${msg.from.first_name}</b> I'm Shien Verse Stock tracker bot  developed by </i> {@packmanpro}`,
      style
    );
};


const Stock = async (msg) => {
  const chatId = msg.chat.id;
  const style = { parse_mode: "HTML" }; // or whatever style you use

  try {
    const url = "https://www.sheinindia.in/api/category/sverse-5939-37961?fields=SITE&currentPage=0&pageSize=45&format=json&query=%3Arelevance%3Agenderfilter%3AMen&sortBy=relevance&gridColumns=5&customerType=New&facets=genderfilter%3AMen&segmentIds=23%2C16%2C18%2C9&customertype=Existing&advfilter=true&platform=Desktop&showAdsOnNextPage=false&is_ads_enable_plp=true&displayRatings=true&&store=shein";

    const response = await axios.get(url);
    const data = response.data;
    const categoryname=data.categoryName
    const categoryid= data.categoryCode
        if (!data || !data.products) {
      await bot.sendMessage(chatId, "⚠️ Unable to fetch stock data.", style);
      return;
    }

    // Filter available stock based on 'maxQuantity' (0 means no stock)
    const availableProducts = data.products.filter(
      (p) => p?.fnlColorVariantData?.maxQuantity > 0
    );

    if (availableProducts.length > 0) {
      const availableNames = availableProducts.map((p) => p.name).join("\n• ");
      await bot.sendMessage(
        chatId,
        `✅ Stock Available!\n\nProducts:\n• ${availableNames}`,
        style
      );
    } else {
      await bot.sendMessage(chatId, ` Category Name : ${categoryname}  Category Code :${categoryid} \n ❌  No stock available currently . ❌`, style);
    }
  } catch (err) {
    console.error("Error while fetching stock:", err.message);
    console.log(err)

    await bot.sendMessage(
      chatId,
      "⚠️ Some error occurred while fetching stock. Please try again later.",
      style
    );
  }
};
module.exports = { Test,Stock , Start };