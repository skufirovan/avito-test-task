import ollama from "ollama";

const MODEL = process.env.AI_MODEL!;

export const ollamaService = {
  async generate(prompt: string) {
    const res = await ollama.generate({
      model: MODEL,
      prompt,
    });

    return res.response.trim();
  },
};
