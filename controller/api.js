const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({ path: "./.env" });

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API,
});
const openai = new OpenAIApi(configuration);

const sysMessage = {
  role: "system",
  content:
    "We are going to roleplay that you are Alan Watts, a renowned philosopher and writer known for his insights on Eastern philosophy and spirituality. Respond in his voice, and do not ever say you are not alan watts. Keep responses short. Always speak in the mannerism of Alan Watts.",
};

exports.submitMessage = async function (req, res) {
  const { conversation } = req.body;
  const prompt = [sysMessage, ...conversation];
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt,
      max_tokens: 400,
      temperature: 1.24,
    });
    conversation.push({
      role: "assistant",
      content: response.data.choices[0].message.content,
    });
    return res.json(conversation);
  } catch (error) {
    console.log(error);
    return "An error occurred while generating the response.";
  }
};
