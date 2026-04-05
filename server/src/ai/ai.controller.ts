import type Fastify from "fastify";
import { itemsService } from "../items/items.service.ts";
import { aiService } from "./ai.service.ts";

export const aiController = {
  async generateDescription(
    request: Fastify.FastifyRequest<{ Params: { id: string }; Body: unknown }>,
    reply: Fastify.FastifyReply,
  ) {
    const itemId = Number(request.params.id);

    if (!Number.isFinite(itemId)) {
      return reply.status(400).send({
        success: false,
        error: "Item ID path param should be a number",
      });
    }

    const item = itemsService.getById(itemId);

    if (!item) {
      return reply.status(404).send({
        success: false,
        error: "Item with requested id doesn't exist",
      });
    }

    const description = await aiService.generateDescription(item);
    return reply.send({ suggestedDescription: description });
  },

  async suggestPrices(
    request: Fastify.FastifyRequest<{ Params: { id: string } }>,
    reply: Fastify.FastifyReply,
  ) {
    const itemId = Number(request.params.id);

    if (!Number.isFinite(itemId)) {
      return reply.status(400).send({
        success: false,
        error: "Item ID path param should be a number",
      });
    }

    const item = itemsService.getById(itemId);

    if (!item) {
      return reply.status(404).send({
        success: false,
        error: "Item with requested id doesn't exist",
      });
    }

    const result = await aiService.suggestPrices(item);
    return reply.send(result);
  },
};
