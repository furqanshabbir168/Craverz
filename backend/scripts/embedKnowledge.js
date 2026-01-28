import OpenAI from "openai";
import fs from "fs";
import '../server.js';
import knowledge from "../models/knowledge.js";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.CHATBOT_API_KEY,
  baseURL:"https://openrouter.ai/api/v1"
});

const data = JSON.parse(
  fs.readFileSync("data/knowledge.json", "utf-8")
);

async function run() {
  for (const item of data) {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: item.content,
    });

    console.log({
      content: item.content,
      embeddingLength: embedding.data[0].embedding.length,
    });

    await knowledge.create({
      content: item.content,
      embedding: embedding.data[0].embedding,
    });
  }
}

run();
