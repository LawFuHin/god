// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Creates a client
const translate = new Translate({
  key: "AIzaSyA5N-i2SrdzKrwe6E5wcDNXTBPofd6wv74",
});

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = "hello world";
const target = "zh-CN";

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
}

translateText();
