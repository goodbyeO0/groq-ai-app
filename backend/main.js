const Groq = require("groq-sdk");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function getGroqChatCompletion(contentMessage) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: contentMessage
            }
        ],
        model: "llama3-8b-8192",
    })
}

app.post("/askGroq", async (req, res) => {
    const contentMessage = req.body.contentMessage;
    console.log(contentMessage)
    const result = await getGroqChatCompletion(contentMessage);
    res.json(result.choices[0]);
});

app.get("/", (req, res) => {
    res.send("test")
})

app.listen(3000, () => {
    console.log("server run on port 3000...")
})