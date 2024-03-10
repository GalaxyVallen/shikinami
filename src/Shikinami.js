const TelegramApi = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { executeCommand, truncateString, md } = require("../libs/helper");
const {
  invalidCommandMessage,
  emptyValueMessage,
  helpTextMessage,
  startTextMessage,
} = require("../libs/constant");
const { searchAnime } = require("../libs/anilist");

class Shikinami extends TelegramApi {
  constructor(token, options) {
    super(token, options);

    this.onText(commands.start, (callback) => {
      const { from } = callback;
      const { id } = from;
      this.sendMessage(id, startTextMessage(from.first_name), {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Anime",
                switch_inline_query_current_chat: "<anime> ",
              },
              {
                text: "Manga",
                switch_inline_query_current_chat: "<manga> ",
              },
              {
                text: "Character",
                switch_inline_query_current_chat: "<character> ",
              },
            ],
            [
              {
                text: "List Commands",
                web_app: {
                  url: process.env.WEB_APP_URI,
                },
              },
            ],
          ],
        },
        parse_mode: "MarkdownV2",
      });
    });

    this.on("text", (text) => {
      console.log("🚀 ~ file: Shikinami.js:68 ~ Shikinami ~ constructor ~ text:", text)
    });

    this.on("webhook_error", (e) => {});

    this.on("message", (data) => {
      executeCommand(data.text, data.from.username);
      const isInCommand = Object.values(commands).some((keyword) =>
        keyword.test(data.text.trim())
      );
      if (!isInCommand && data.text.trim().startsWith("/")) {
        this.sendMessage(
          data.from.id,
          invalidCommandMessage(data.text.split(" ")[0]),
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "See available commands",
                    callback_data: "available_command",
                  },
                ],
              ],
            },
            parse_mode: "MarkdownV2",
          }
        );
        console.log(
          `Invalid Command "${data.text}" Executed By ${data.from.username}`
        );
      }
    });

    this.on("callback_query", (callback) => {
      const callbackName = callback.data;
      console.log(
        "🚀 ~ file: Shikinami.js:89 ~ Shikinami ~ this.on ~ callbackName:",
        callbackName
      );
      const { id } = callback.from;
      if (callbackName == "available_command")
        this.sendMessage(id, helpTextMessage, {
          parse_mode: "Markdown",
        });
    });

    this.on("polling_error", (e) => {
      console.error(
        "🚀 ~ file: Shikinami.js:97 ~ Shikinami ~ constructor ~ polling_error:",
        e
      );
      return;
    });

    this.on("error", (e) => {
      console.error(
        "🚀 ~ file: Shikinami.js:97 ~ Shikinami ~ constructor ~ error:",
        e
      );
      return;
    });

    this.on("inline_query", async ({ id, query, chat_type }) => {
      const [menu, ...querySearch] = query.split(" ");
      // console.log("🚀 ~ file: Shikinami.js:110 ~ Shikinami ~ this.on ~ menu:", menu.match(/<(.*?)>/)[1])
      const responses = await searchAnime(querySearch.toString(), 20);

      let inlineResult = [];

      responses.forEach((res) => {
        inlineResult = [
          ...inlineResult,
          {
            type: "article",
            id: res.id,
            thumb_url: res.coverImage.large,
            title: res.title.userPreferred,
            description: `${res.seasonYear || "?"} \| ${res.format}`,
            input_message_content: {
              message_text: `
              *${md(res.title.userPreferred)}*
                [ ](${res?.bannerImage && res.bannerImage})
*Type* : \`${res.format}\`
*Status* : \`${res.status}\`
*Episode* : \`${res.episodes}\`
*Duration* : \`${res.duration} min\`
*Score* : \`${res.averageScore}\`
*Genres* : \`${res.genres.join(", ")}\`
*Studios* : \`${res.studios?.edges[0]?.node?.name}\`

_${md(truncateString(res.description))}_
              `,
              parse_mode: "MarkdownV2",
            },
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Airing status",
                    url: `https://t.me/EvarodyBot?start=airing-${res.id}`,
                  },
                  {
                    text: "Detail...",
                    url: `https://t.me/EvarodyBot?start=detail-${res.id}`,
                  },
                ],
              ],
            },
          },
        ];
      });
      if (querySearch.toString().length >= 1) {
        this.answerInlineQuery(id, inlineResult);
      } else {
        this.answerInlineQuery(id, [
          {
            type: "article",
            id: "0",
            thumb_url: "https://placehold.co/300x300/000000/FFF?text=Anime",
            title: "Anime",
            description: "Search anime...",
            input_message_content: {
              message_text: "Search Anime",
            },
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Click here",
                    switch_inline_query_current_chat: "<anime> ",
                  },
                ],
              ],
            },
          },
          {
            type: "article",
            id: "2",
            thumb_url: "https://placehold.co/300x300/000000/FFF?text=Chara",
            title: "Character",
            description: "Search character...",
            input_message_content: {
              message_text: "Search Character",
            },
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Click here",
                    switch_inline_query_current_chat: "<character> ",
                  },
                ],
              ],
            },
          },
        ]);
      }
    });
  }

  getAnimeByInline() {
    // this
  }

  getAnimeSearch() {
    this.onText(commands.anime, async (data) => {
      const text = data.text.split(" ");
      const [cmd, ...kw] = text;
      const keyword = kw.join(" ") || false;
      const responses = await searchAnime(keyword);
      let inlineData = [];

      executeCommand(cmd, data.from.username);

      if (keyword && keyword.trim() == "") {
        this.sendMessage(data.from.id, emptyValueMessage("anime"), {
          parse_mode: "MarkdownV2",
        });
        return false;
      }

      responses.forEach((res) => {k
        inlineData = [
          ...inlineData,
          [
            {
              text: res.title.userPreferred,
              callback_data: res.id,
            },
          ],
        ];
      });

      this.sendMessage(data.chat.id, `Search result for *${keyword}* :`, {
        reply_markup: {
          inline_keyboard: inlineData,
        },
        parse_mode: "MarkdownV2",
      });
    });
  }
}

module.exports = Shikinami;
