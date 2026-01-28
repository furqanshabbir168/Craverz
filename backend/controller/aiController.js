import OpenAI from "openai";
import knowledge from "../models/knowledge.js";
import { searchKnowledge } from "../utils/vectorSearch.js";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.CHATBOT_API_KEY,
  baseURL:"https://openrouter.ai/api/v1"
});

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  // 1. Convert user message to embedding
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: message,
  });

  // 2. Load knowledge
  const docs = await knowledge.find();

  // 3. Find best matches
  const matches = await searchKnowledge(
    queryEmbedding.data[0].embedding,
    docs
  );

  let context = "";
  let isContextAvailable = matches.length > 0;

  if (isContextAvailable) {
    context = matches.map(m => m.content).join("\n");
  }

  // 4. Ask GPT
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: isContextAvailable
          ? "You are the official AI guide for the Cravez website. Answer ONLY using the context provided."
          : "You are the official AI guide for the Cravez website. If you don't know the answer based on Cravez, politely greet the user and say you can only assist with Cravez information.",
      },
      {
        role: "user",
        content: isContextAvailable
          ? `Context:\n${context}\n\nQuestion:\n${message}`
          : `Question:\n${message}`,
      },
    ],
  });

  res.json({
    reply: completion.choices[0].message.content,
  });
};
