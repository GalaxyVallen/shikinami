const startTextMessage = (first_name) =>
  `
Hello ${first_name}
I'm Blue, I can help you to find everything about anime, manga, or characters

||_Shikinami project_||
`;

const helpTextMessage = `
Please use the available commands below:

\`/anime <YOUR QUERY>\` 
Search anime by either romaji or english title

\`/manga <YOUR QUERY>\` 
Search manga by either romaji or english title

\`/character <YOUR QUERY>\` 
Search anime characters by name
`;

const invalidCommandMessage = (cmd) =>
  `Sorry, the command ${cmd} is not available`;

const emptyValueMessage = (cmd) =>
  `*How to use ${cmd} command ?*

  \`/${cmd} <YOUR_QUERY>\`
  `;
const globalErrorMessage = `Oops, something went wrong! Please try again later.`;
const globalSuccessMessage = `Operation successful!`;
const pollingErrorMessage = `Error occurred while polling for updates. Please check the bot configuration.`;

module.exports = {
  startTextMessage,
  helpTextMessage,
  invalidCommandMessage,
  emptyValueMessage,
  globalErrorMessage,
  globalSuccessMessage,
  pollingErrorMessage,
};
