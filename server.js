const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Génère un plan de site web adapté à : ${prompt}` }],
      temperature: 0.7,
    });

    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send("Erreur IA : " + error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Assistant IA est en ligne 🚀");
});

app.listen(3000, () => console.log("Serveur IA lancé sur le port 3000"));
