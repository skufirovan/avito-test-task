import type { FastifyInstance } from "fastify";
import { aiController } from "./ai.controller.ts";

export async function aiRoutes(fastify: FastifyInstance) {
  fastify.post("/items/:id/ai-description", aiController.generateDescription);
  fastify.post("/items/:id/ai-price", aiController.suggestPrices);
}
