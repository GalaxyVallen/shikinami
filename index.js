require("dotenv").config();

const Shikinami = require("./src/Shikinami");
const token = process.env.TELEGRAM_TOKEN;
const options = { polling: true };

console.log("Checking updates...");

const Bot = new Shikinami(token, options);

const App = () => {
  // Just to ping!
  console.log("Starting...");

  Bot;
  Bot.getAnimeSearch();

  console.log("Finished");
};

App();
