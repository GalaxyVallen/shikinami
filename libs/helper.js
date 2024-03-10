function invalidCommand() {}

function executeCommand(command, from) {
  // return console.log(`Command "${command}" executed by ${from}`);
}

const SPECIAL_CHARS = [
  "\\",
  "_",
  "*",
  "[",
  "]",
  "(",
  ")",
  "~",
  "`",
  ">",
  "<",
  "&",
  "#",
  "+",
  "-",
  "=",
  "|",
  "{",
  "}",
  ".",
  "!",
];

// const md = (text) => {
//   text && text.replace(/<\/?[^>]+(>|$)/g, "");
//   text &&
//     SPECIAL_CHARS.forEach(
//       (char) => (text = text.replaceAll(char, `\\${char}`))
//     );
//   return text;
// };

// const br = (text) => text.replace(/\<br>/g, "\\n").replace(/\<p>/g, "\\&nbsp;");

const md = (text) => {
  if (text != null) {
    text = removeTags(text);
    return text
      .replace(/\_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/\~/g, "\\~")
      .replace(/\`/g, "\\`")
      .replace(/\>/g, "\\>")
      .replace(/\#/g, "\\#")
      .replace(/\+/g, "\\+")
      .replace(/\-/g, "\\-")
      .replace(/\=/g, "\\=")
      .replace(/\|/g, "\\|")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(/\./g, "\\.")
      .replace(/\!/g, "\\!");
  }
};

const truncateString = (string = "", maxLength = 580) =>
  string && string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

// this.on("sticker", (data) => {
//   console.log(
//     "🚀 ~ file: Shikinami.js:10 ~ Shikinami ~ this.on ~ data:",
//     data.sticker
//   );
//   this.sendSticker(data.from.id, data.sticker.file_id);
// });

module.exports = {
  invalidCommand,
  executeCommand,
  md,
  truncateString,
};
