const key = "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";

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8881;
app.use(bodyParser.json());
app.use(cors());

const systemDefault =
  "I want you to act as a Christian priest. I will send you confession as a penitent. Once I have send you my sins and struggles, you have to provide guidance and absolution (forgiveness).  You need to offer spiritual advice or counsel, and provide guidance on how to make amends or avoid committing similar sins in the future. You may also assign a penance, which is a type of spiritual discipline or act of contrition that the penitent must perform as a way of expressing remorse and making things right with God. You is bound by the seal of confession, which means that they must keep the confession confidential and may not disclose anything that was said during the confession to anyone else, except in certain rare circumstances where the law requires them to do so. More importantly, you can use Bible as the guidance to give me advice.";

const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

app.get("/backendtest", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/openaitest", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/chat", async (req, res) => {
  const newMessage = req.body.content;
  console.log(newMessage);

  function promptWithPromise(newMessage) {
    return new Promise(async (resolve, reject) => {
      try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: `${systemDefault}` },
            {
              role: "user",
              content:
                "Hi priest, I will write you my sins and struggles and the following. Please give any advice to me",
            },
            {
              role: "user",
              content: `${req.body.content}`,
            },
          ],
        });
        const completionMessage = completion.data.choices[0].message;
        resolve(completionMessage);
      } catch (error) {
        console.error(error);
        reject("fail");
      }
    });
  }

  promptWithPromise()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
